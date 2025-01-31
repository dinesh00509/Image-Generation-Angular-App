import { Injectable } from '@angular/core';
import Together from "together-ai";
import { environment } from '../environments/environments';
require('dotenv').config();
@Injectable({
  providedIn: 'root'
})

export class TogetherAiService {
  private together = new Together(
    {
    apiKey : environment.togetherAIKey,
    }
  );

  constructor() { }

  async generateImage(prompt: string): Promise<any> {



    try {
      const res = await this.together.images.create({
        prompt: prompt,
        model: "black-forest-labs/FLUX.1-schnell-Free",
        width: 1024,
        height: 768,
        seed: 12345,
        steps: 3,
        response_format: "base64"
      })


      if (res.data && res.data.length > 0 && res.data[0].b64_json) {
        return `data:image/jpeg;base64,${res.data[0].b64_json}`;
      } else {
        console.error('Invalid response format:', res);
        return undefined;
      }

      console.log(res, '---------------------res');
      

    } catch (error) {
      console.error(error);

    }

  }

}
