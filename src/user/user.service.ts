import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InBlockDto } from './dto/in_block.dto';
import { InGetTokenDto } from './dto/in_get_token.dto';
import { InSignInDto } from './dto/in_sign_in.dto';
import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
// import * as serviceAccount from './serviceAccountKey.json';
import * as serviceAccount from './serviceAccountKey.json';

import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

import * as bcrypt from 'bcryptjs';
import { InSignInAppleDto } from './dto/in_sign_in_apple.dto';
import { OutSignInDto } from './dto/out_sign_in.dto';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

interface AppleJwtTokenPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email?: string;
  email_verified?: string;
  is_private_email?: string;
  auth_time: number;
  nonce_supported: boolean;
}

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async getMe(user: User): Promise<User> {
    const _id = user.id;

    return this.usersRepository.findOne({ _id });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  async getUser(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  async signUp(inSignUpDto: InSignUpDto): Promise<void> {
    return this.usersRepository.create(inSignUpDto);
  }

  async signIn(inSignInDto: InSignInDto): Promise<OutSignInDto> {
    const { email, password } = inSignInDto;

    const user = await this.usersRepository.findOne({ email });
    if (user.status == 'drop') {
      return { accessToken: '' };
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email, id: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new ConflictException('user not exist');
    }
  }
  async getToken(InGetTokenDto: InGetTokenDto): Promise<OutSignInDto> {
    const { email } = InGetTokenDto;
    const payload = { email };
    const user = await this.usersRepository.findOne({ email });
    if (user.status == 'drop') {
      return { accessToken: '' };
    }
    if (user == null) throw new ConflictException('user not exist');

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async drop(user: User): Promise<boolean> {
    user.status = 'drop';
    const { email } = user;

    const updatedUser = await this.usersRepository.findOneAndDrop(
      { email },
      user,
    );

    if (updatedUser != null) {
      return true;
    }
  }

  async signInApple(inSignInAppleDto: InSignInAppleDto): Promise<OutSignInDto> {
    const { idToken } = inSignInAppleDto;

    const decodedToken = jwt.decode(idToken, { complete: true }) as {
      header: { kid: string; alg: jwt.Algorithm };
      payload: { sub: string };
    };

    const keyIdFromToken = decodedToken.header.kid;
    const applePublicKeyUrl = 'https://appleid.apple.com/auth/keys';

    const jwksClient = new JwksClient({ jwksUri: applePublicKeyUrl });
    const key = await jwksClient.getSigningKey(keyIdFromToken);
    const publicKey = key.getPublicKey();
    const verifiedDecodedToken: AppleJwtTokenPayload = jwt.verify(
      idToken,
      publicKey,
      {
        algorithms: [decodedToken.header.alg],
      },
    ) as AppleJwtTokenPayload;

    if (verifiedDecodedToken.email == null)
      throw new ConflictException('email not exist');

    const payload = {
      email: verifiedDecodedToken.email,
    };

    let user = await this.usersRepository.findOne(payload);
    if (user == null) {
      const newUser: InSignUpDto = {
        email: verifiedDecodedToken.email,
        name: 'no name',
        social: 'apple',
        password: 'applepassword',
        lat: null,
        lng: null,
        address: null,
        profileImage: null,
        firebaseToken: inSignInAppleDto.firebaseToken,
      };
      // await this.admin.auth().createUser(newUser);
      await this.usersRepository.create(newUser);
      user = await this.usersRepository.findOne(payload);
    }

    if (user.status == 'drop') {
      return { accessToken: '' };
    }
    if (user) {
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new ConflictException('user not exist');
    }
  }

  async signInKakao(inSignInKakaoDto: InSignInKakaoDto): Promise<OutSignInDto> {
    const updateParams = {
      email: inSignInKakaoDto.email,
      profileImage: inSignInKakaoDto.profileImage,
      name: inSignInKakaoDto.name,
    };
    const { email } = inSignInKakaoDto;

    let user = await this.usersRepository.findOne({ email });

    if (user == null) {
      const newUser: InSignUpDto = {
        email: updateParams.email,
        name: updateParams.name ?? 'no name',
        profileImage: updateParams.profileImage,
        social: 'kakao',
        password: 'kakaopassword',
        lat: null,
        lng: null,
        address: null,
        firebaseToken: inSignInKakaoDto.firebaseToken,
      };
      // await this.admin.auth().createUser(newUser);
      await this.usersRepository.create(newUser);
      user = await this.usersRepository.findOne({ email });
    }

    if (user.status == 'drop') {
      return { accessToken: '' };
    }
    if (user) {
      const inSignInDto: InSignInDto = {
        email: user.email,
        password: 'kakaopassword',
        firebaseToken: inSignInKakaoDto.firebaseToken,
      };

      const accessToken = await this.signIn(inSignInDto);

      return accessToken;
      // const payload = { email };
      // console.log(payload);
      // console.log(user);

      // const accessToken = await this.jwtService.signAsync(payload);
      // console.log(accessToken);
      // return { accessToken };
    } else {
      throw new ConflictException('user not exist');
    }
  }

  async updateUser(inUpdateUserDto: InUpdateUserDto): Promise<User> {
    const { email } = inUpdateUserDto;

    return this.usersRepository.findOneAndUpdate({ email }, inUpdateUserDto);
  }
  async blockUser(inBlockDto: InBlockDto, user: User): Promise<User> {
    const _id = user.id;

    if (user.id == inBlockDto.userId) {
      throw new ConflictException('can not block myself');
    }
    return this.usersRepository.findOneAndBlock({ _id }, inBlockDto);
  }
}
