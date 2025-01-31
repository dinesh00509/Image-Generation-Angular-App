import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TogetherAiService } from '../together-ai.service';

@Component({
  selector: 'app-img-generator',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './img-generator.component.html',
  styleUrl: './img-generator.component.css'
})
export class ImgGeneratorComponent {
promptInput: string = '';
imageUrl : string = '';
isLoading: boolean = false;

constructor(private togetherAiService: TogetherAiService) { }

async generateImage(){
    if(this.promptInput.trim() === ''){
      alert('Please enter a prompt.');
      return
    }
    this.isLoading = true;

    try{
      this.imageUrl = await this.togetherAiService.generateImage(this.promptInput);
      console.log(this.imageUrl,'---------------------');
      

    }
    catch(error){

      alert('Failed to generate image. Please try again.');
      
    }

    finally{
      this.isLoading = false;
    }

}



}
