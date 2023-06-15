<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Imagick;

class testExtensions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:image';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command tests Ghostscript and ImageMagick.';

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
        // Test ImageMagick
        $image = new Imagick();
        $image->newImage(100, 100, 'white');
        $image->setImageFormat("png");
        $image->writeImage(storage_path('app/public/ImageMagick_image.png'));
        echo "ImageMagick is working!";

        // Test Ghostscript
        $pdfPath = storage_path('app/public/test_pdf.pdf');
        exec("gs -q -dNOPAUSE -sDEVICE=png16m -r300 -sOutputFile=" . storage_path('app/public/Ghostscript_image.png') . " " . $pdfPath);
        echo "Ghostscript is working!";
    }
}
