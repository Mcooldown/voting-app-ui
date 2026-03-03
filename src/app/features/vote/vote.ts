import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoteService } from '../../core/services/vote.service';
import { Candidate } from '../../core/models/vote.model';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class VoteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private voteService = inject(VoteService);

  candidates = signal<Candidate[]>([]);
  loading = signal(false);
  submitting = signal(false);
  alreadyVoted = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  form = this.fb.nonNullable.group({
    candidate_name: ['', [Validators.required]],
  });

  ngOnInit() {
    this.loading.set(true);
    this.voteService.getCandidates().subscribe({
      next: (list) => { this.candidates.set(list); this.loading.set(false); },
      error: () => { this.errorMsg.set('Failed to load candidates.'); this.loading.set(false); },
    });
  }

  selectCandidate(name: string) {
    this.form.controls.candidate_name.setValue(name);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    this.errorMsg.set('');
    this.successMsg.set('');
    this.voteService.castVote(this.form.getRawValue().candidate_name).subscribe({
      next: (res) => {
        this.successMsg.set(res.message ?? 'Your vote has been cast!');
        this.alreadyVoted.set(true);
        this.submitting.set(false);
      },
      error: (err) => {
        if (err?.status === 409) {
          this.alreadyVoted.set(true);
          this.errorMsg.set('You have already cast your vote.');
        } else {
          this.errorMsg.set(err?.error?.message ?? 'Failed to cast vote.');
        }
        this.submitting.set(false);
      },
    });
  }
}
