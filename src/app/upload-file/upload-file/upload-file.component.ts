import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): any { }

  onChange(event: any): any {
    console.log();

    const selectedFiles = event.srcElement.files as FileList;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload(): any {
    if (this.files && this.files.size > 0) {
      // em producao talvez nao precise do / api
      this.service.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress((progress: any) => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe((response: any) => console.log('Upload Concluido'));
        /*.subscribe((event: HttpEvent<Object>) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload Concluído');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', percentDone);
            this.progress = percentDone;
          }
        });*/
    }
  }

  onDownloadExcel(): any {
    this.service.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.xlsx');
      });
  }

  onDownloadPDF(): any {
    this.service.download(environment.BASE_URL + '/downloadPDF')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.pdf');
      });
  }
}
