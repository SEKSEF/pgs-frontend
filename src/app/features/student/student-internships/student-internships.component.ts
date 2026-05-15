import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InternshipService } from '../../../core/services/internship.service';
import { InternshipResponse } from '../../../core/models/internship.models';

@Component({
  selector: 'app-student-internships',
  standalone: true,
  imports: [DatePipe, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './student-internships.component.html',
  styleUrl: './student-internships.component.scss'
})
export class StudentInternshipsComponent implements OnInit {
  private internshipService = inject(InternshipService);

  internships: InternshipResponse[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.internshipService.getMyInternships().pipe(finalize(() => this.loading = false)).subscribe({
      next: (data) => { this.internships = data; },
      error: (err) => { this.error = err.message || 'Failed to load internships'; }
    });
  }
}
