import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as firebase from 'firebase-admin';
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

@Injectable()
export class UserService {
  private admin: any;

  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async getMe(user: User): Promise<User> {
    const { _id } = user;
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
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
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

  async signInApple(inSignInAppleDto: InSignInAppleDto): Promise<void> {
    const { email } = inSignInAppleDto;
    const updateParams = {
      email: inSignInAppleDto.email,
      profileImage: inSignInAppleDto.profileImage,
      name: inSignInAppleDto.name,
    };

    const newUser: InSignUpDto = {
      email: updateParams.email,
      name: updateParams.name ?? 'no name',
      profileImage: updateParams.profileImage,
      social: 'apple',
      password: 'applepassword',
      lat: null,
      lng: null,
      address: null,
    };

    const user = await this.usersRepository.findOne({ email });
    if (user != null) {
      return;
    }
    await this.usersRepository.create(newUser);
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
      };
      // await this.admin.auth().createUser(newUser);
      await this.usersRepository.create(newUser);
      user = await this.usersRepository.findOne({ email });
    }

    if (user.status == 'drop') {
      return { accessToken: '' };
    }
    if (user) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new ConflictException('user not exist');
    }
  }

  async updateUser(inUpdateUserDto: InUpdateUserDto): Promise<User> {
    const { email } = inUpdateUserDto;
    return this.usersRepository.findOneAndUpdate({ email }, inUpdateUserDto);
  }
  async blockUser(inBlockDto: InBlockDto, user: User): Promise<User> {
    const { userId } = inBlockDto;

    if (user._id.toString() == inBlockDto.userId.toString()) {
      throw new ConflictException('can not block myself');
    }
    return this.usersRepository.findOneAndBlock({ userId }, inBlockDto);
  }
}
