import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string): any {

    const formData = new FormData();
    // iterar cada arquivo com foreach, pegar a variavel formdata e passar o nome do atributo, o segundo o bloob(arquivo),
    // e terceiro e o arquivo
    files.forEach(file => formData.append('file', file, file.name));

    /*const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);*/

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  download(url: string): any {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress
      // content-length
    });
  }

  handleFile(res: any, fileName: string): any {
    const file = new Blob([res], {
      type: res.type
    });

    // IE
    /*if (window.navigator && window.navigator.msSaveOrOpenBlob) {
       window.navigator.msSaveOrOpenBlob(file);
       return;
     }*/

    // o nome que quiser
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => { // PARA FIREFOX
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
