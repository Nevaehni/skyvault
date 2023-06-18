<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class IdeHelper extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ide:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command run all ide helper commands in one go.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Starting');
        Artisan::call('ide-helper:generate');
        $this->info('Completed ide-helper:generate');
        Artisan::call('ide-helper:models --no-interaction');
        $this->info('Completed ide-helper:models --no-interaction');
        Artisan::call('ide-helper:meta');
        $this->info('Completed ide-helper:meta');
        $this->info('Finished');
    }
}
