<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class VerifyEmail extends Notification
{
    use Queueable;


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );

        return (new MailMessage)
            ->subject('Confirma tu cuenta en Dedux')
            ->greeting('¡Hola!')
            ->line('Gracias por registrarte en Dedux. Tu cuenta ya está casi lista para comenzar a automatizar tus gastos y gestionar tus facturas de forma inteligente.')
            ->action('Confirmar Cuenta', $verificationUrl)
            ->line('Por seguridad, si tú no creaste esta cuenta, no es necesario que hagas nada, puedes ignorar este mensaje.')
            ->salutation('El equipo de Dedux');
    }
}
