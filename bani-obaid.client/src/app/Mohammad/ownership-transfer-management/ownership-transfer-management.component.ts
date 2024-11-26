import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL Service/url.service';

@Component({
  selector: 'app-ownership-transfer-management',
  templateUrl: './ownership-transfer-management.component.html',
  styleUrls: ['./ownership-transfer-management.component.css']
})
export class OwnershipTransferManagementComponent implements OnInit {
  ownershipTransfers: any[] = [];

  constructor(private ownershipTransferService: UrlService) { }

  ngOnInit(): void {
    this.fetchOwnershipTransfers();
  }

  // Fetch all ownership transfers
  fetchOwnershipTransfers(): void {
    this.ownershipTransferService.getAllOwnershipTransfers().subscribe({
      next: (data) => (this.ownershipTransfers = data),
      error: (err) => console.error('Error fetching ownership transfers:', err)
    });
  }

  // Delete a specific ownership transfer
  deleteOwnershipTransfer(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.ownershipTransferService.deleteOwnershipTransfer(id).subscribe({
        next: () => {
          this.ownershipTransfers = this.ownershipTransfers.filter(
            (transfer) => transfer.id !== id
          );
          alert('تم حذف السجل بنجاح');
        },
        error: (err) => console.error('Error deleting ownership transfer:', err)
      });
    }
  }
}
