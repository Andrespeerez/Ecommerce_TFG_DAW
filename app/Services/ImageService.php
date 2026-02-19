<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class ImageService {

    /**
     * Upload an image, convert it to webp and return the path to be saved in DB
     * 
     * @param UploadedFile $file
     * @param string $directory
     * @param int $quality
     * @return string
     */
    public function uploadAsWebP(UploadedFile $file, string $directory = 'products', int $quality = 85): string {

        // 1 Generate file name (unique random name)
        $filename = Str::uuid() . '.webp'; // uuid -> unique universal identifier
        $path = $directory . '/' . $filename;
        $fullpath = storage_path('app/public/' . $path); // /storage/app/public/products/.....webp

        // 2 Create directory if it doesn't exist
        if (! file_exists(dirname($fullpath))) {
            mkdir(dirname($fullpath), 0755, true);
        }

        // 3 Convert and save as WebP
        Image::read($file)
            ->scale(width: 800)
            ->toWebp(quality: $quality)
            ->save($fullpath);

        return $path; // to be saved in DB
    }

    /**
     * Delete an image file. Return true if is correctly deleted
     * 
     * @param string $path
     * @return bool
     */
    public function deleteImage(string $path): bool {
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }

    /**
     * Update an image. delete old and upload a new one
     * 
     * @param mixed $newFile
     * @param mixed $oldPath
     * @param string $directory
     * @return string|null
     */
    public function updateImage(?UploadedFile $newFile, ?string $oldPath, string $directory = 'products') : ?string
    {
        // If there is new file, delete the old one and upload new
        if ($newFile) {
            if ($oldPath) {
                $this->deleteImage($oldPath);
            }

            return $this->uploadAsWebP($newFile, $directory);
        }

        // No nw image
        return $oldPath;
    }
}