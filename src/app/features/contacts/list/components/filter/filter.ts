import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  @Output() newFilter = new EventEmitter();
  filterText: string = '';
  addNew() {}

  emitFilter() {
    this.newFilter.emit(this.filterText);
  }
}
