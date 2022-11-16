import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UploadsService } from './uploads.service';

@ApiTags('upload')
@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Post('/file')
  @UseInterceptors(FilesInterceptor('file', 5))
  async uploadFile(@UploadedFiles() files): Promise<ResponseDto<string>> {
    console.log(files);

    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const imgurl: string[] = [];
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const key = await this.uploadsService.uploadImage(file);
        imgurl.push(
          `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/` + key,
        );
      }),
    );

    return {
      success: true,
      error: null,
      data: imgurl,
    };
  }
  //   AWS.config.update({
  //     region: 'ap-northeast-2',
  //     credentials: {
  //       accessKeyId: this.config.get('AWS_ACCESS_KEY'),
  //       secretAccessKey: this.config.get('AWS_SECRET_KEY'),
  //     },
  //   });
  //   try {
  //     console.log('------- upload api call ----------');
  //     const BUCKET_NAME = this.config.get('AWS_BUCKET_NAME');
  //     const objectName = `profile_image/${Date.now().toString()}-${
  //       file.originalname
  //     }`;
  //     const upload = await new AWS.S3()
  //       .putObject({
  //         Key: objectName,
  //         Body: file.buffer,
  //         Bucket: BUCKET_NAME,
  //       })
  //       .promise();
  //     console.log(upload);
  //     const url = `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${objectName}`;
  //     return {
  //       success: true,
  //       error: null,
  //       data: [url],
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
