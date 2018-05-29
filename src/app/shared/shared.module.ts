import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { PdfCreatorService } from './services/pdf-creator.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
        PdfCreatorService
    ],
    exports: [
        LoaderComponent
    ]
})
export class SharedModule { }
