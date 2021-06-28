<?php

namespace App\Mail;

use App\Order;
use Illuminate\Bus\Queueable;
use App\Restaurant;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendNewMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $restaurant_id = $this->order->restaurant_ID;
        $restaurant = Restaurant::where('id', $restaurant_id)->first();
        $rest_name = $restaurant->rest_name;
        return $this->view('admin.mail.index', compact('rest_name'));
    }
}
