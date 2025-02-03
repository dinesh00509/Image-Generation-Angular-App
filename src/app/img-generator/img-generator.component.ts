import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TogetherAiService } from '../together-ai.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-img-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './img-generator.component.html',
  styleUrls: ['./img-generator.component.css'],
})
export class ImgGeneratorComponent implements OnDestroy {
  promptInput: string = '';
  imageUrl: string = '';
  isLoading: boolean = false;

  // Placeholder for no image
  private placeholderImageUrl = 'https://via.placeholder.com/600x400?text=No+Image';

  // Create a Subject to handle input changes
  private promptInput$ = new Subject<string>();

  constructor(private togetherAiService: TogetherAiService) {
    // Subscribe to the debounced input stream
    this.promptInput$
      .pipe(
        debounceTime(1000), 
        distinctUntilChanged(), // Only emit if the value has changed
        switchMap((prompt) => {
          if (!prompt.trim()) {
            // If input is empty, set the placeholder image and skip API call
            this.imageUrl = this.placeholderImageUrl;
            return Promise.resolve(''); // No API call needed
          }

          // If input is not empty, generate an image
          this.isLoading = true; // Start loading
          return this.togetherAiService.generateImage(prompt); // Call the service
        })
      )
      .subscribe({
        next: (url) => {
          if (url) {
            this.imageUrl = url; // Set the generated image URL
          }
        },
        error: () => {
          alert('Failed to generate image. Please try again.');
        },
        complete: () => {
          this.isLoading = false; // Stop loading
        },
      });
  }

  // Emit input changes to the Subject
  onInputChange(value: string): void {
    this.promptInput$.next(value);
  }

  ngOnDestroy(): void {
    // Clean up the Subject to avoid memory leaks
    this.promptInput$.complete();
  }
}