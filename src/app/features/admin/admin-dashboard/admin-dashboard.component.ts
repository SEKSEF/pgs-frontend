import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../core/services/admin.service';
import { StatsResponse } from '../../../core/models/admin.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, DecimalPipe, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  stats: StatsResponse | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.adminService.getStats().pipe(finalize(() => this.loading = false)).subscribe({
      next: (s) => { this.stats = s; },
      error: (err) => { this.error = err.message || 'Failed to load statistics'; }
    });
  }
}
