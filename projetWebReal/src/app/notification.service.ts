import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string | Error): void {
    const errorMessage = this.getErrorMessage(message);

    this.snackBar.open(errorMessage, 'Fermer', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private getErrorMessage(error: string | Error): string {

    if (typeof error === 'string') {
      return error;
    } else if (error instanceof Error) {
      const statusCode = this.extractStatusCode(error);

      switch (statusCode) {
        case 401:
          return 'Non autorisé : Veuillez vérifier vos identifiants.';
        default:
          return error.message || 'Une erreur inattendue s\'est produite.';
      }
    } else {
      return 'Une erreur inattendue s\'est produite.';
    }
  }


  private extractStatusCode(error: Error): number | null {
    return (error as any).status || null;
  }
}
