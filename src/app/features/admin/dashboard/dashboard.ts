import { Component, inject, signal, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { VoteService } from '../../../core/services/vote.service';
import { CandidateResult } from '../../../core/models/vote.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private voteService = inject(VoteService);

  results = signal<CandidateResult[]>([]);
  totalVotes = signal(0);
  loading = signal(false);
  errorMsg = signal('');

  ngOnInit() {
    this.loading.set(true);
    this.voteService.getResults().subscribe({
      next: (data) => {
        const sorted = [...data.candidates].sort((a, b) => b.voteCount - a.voteCount);
        this.results.set(sorted);
        this.totalVotes.set(data.total);
        this.loading.set(false);
      },
      error: () => { this.errorMsg.set('Failed to load results.'); this.loading.set(false); },
    });
  }

  percentage(voteCount: number): number {
    const total = this.totalVotes();
    return total === 0 ? 0 : Math.round((voteCount / total) * 100);
  }
}
