import { loadFeature, defineFeature } from 'jest-cucumber';
import fs from 'fs';
import request from 'supertest';
import app from '../../../src/app';

const feature = loadFeature('./features/file.feature');

defineFeature(feature, (test) => {
  const img =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0' +
    'NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO' +
    '3gAAAABJRU5ErkJggg==';
  // strip off the data: url prefix to get just the base64-encoded bytes
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  let globalFileName: string;
  afterAll(() => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlinkSync(globalFileName);
  });
  test('Upload de arquivo', ({ given, when, then }) => {
    let uploadResponse: any;

    given(/^eu tenho um arquivo chamado "(.*)"$/, (fileName: string) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(fileName, buf);
      // file is a png
      globalFileName = fileName;
    });

    when(
      /^eu tento fazer upload do arquivo "(.*)"$/,
      async (fileName: string) => {
        uploadResponse = await request(app)
          .post('/files/upload')
          .attach('file', fileName);
      },
    );

    then(/^eu devo receber um código de sucesso "(.*)"$/, (code: string) => {
      expect(uploadResponse.statusCode).toEqual(Number(code));
    });
  });
});
