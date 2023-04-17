import {
  Body,
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
  async uploadFile(
    @UploadedFiles() files,
    @Body() body,
  ): Promise<ResponseDto<string>> {
    const imageUrls: string[] = [];
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const dest = body.folder;
        const key = await this.uploadsService.uploadImage(file, dest);
        imageUrls.push(key);
      }),
    );

    return {
      success: true,
      error: null,
      data: imageUrls,
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
