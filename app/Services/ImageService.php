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
     * @return array
     */
    public function uploadAsWebP(UploadedFile $file, string $directory = 'products', int $quality = 85): array {

        // 1 Generate file name (unique random name)
        $filename = Str::uuid(); // uuid -> unique universal identifier
        $path = $directory . '/' . $filename;
        $fullpath = storage_path('app/public/' . $path); // /storage/app/public/products/.....webp

        // 2 Create directory if it doesn't exist
        if (! file_exists(dirname($fullpath))) {
            mkdir(dirname($fullpath), 0755, true);
        }

        // 3 Convert and save as WebP
        Image::read($file)
            ->pad(width: 600, height: 600, background: 'ffffff') // https://image.intervention.io/v3/modifying-images/resizing
            ->toWebp(quality: $quality)
            ->save($fullpath . '.webp');

        Image::read($file)
            ->pad(width: 450, height: 450, background: 'ffffff') // https://image.intervention.io/v3/modifying-images/resizing
            ->toWebp(quality: $quality)
            ->save($fullpath . '_small.webp');

        Image::read($file)
            ->pad(width: 128, height: 128, background: 'ffffff') // https://image.intervention.io/v3/modifying-images/resizing
            ->toWebp(quality: $quality)
            ->save($fullpath . '_preview.webp');



        return [
            'image_url' =>  $path . '.webp',
            'image_small_url' =>  $path . '_small.webp',
            'image_preview_url' =>  $path . '_preview.webp',
        ];
    }

    /**
     * Delete an image file. Return true if is correctly deleted
     * 
     * @param string $path
     * @return bool
     */
    public function deleteImages(?string $imagePath, ?string $imageSmallPath, ?string $imagePreviewPath): bool {
        $deleted = true;

        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            $deleted = Storage::disk('public')->delete($imagePath);
        }

        if ($imageSmallPath && Storage::disk('public')->exists($imageSmallPath)) {
            $deleted = Storage::disk('public')->delete($imageSmallPath);
        }

        if ($imagePreviewPath && Storage::disk('public')->exists($imagePreviewPath)) {
            $deleted = Storage::disk('public')->delete($imagePreviewPath);
        }

        return $deleted;
    }

    /**
     * Update an image. delete old and upload a new one
     * 
     * @param mixed $newFile
     * @param mixed $oldImagePath
     * @param mixed $oldImageSmallPath
     * @param mixed $oldImagePreviewPath
     * @param string $directory
     * @return array
     */
    public function updateImages(?UploadedFile $newFile, ?string $oldImagePath, ?string $oldImageSmallPath, ?string $oldImagePreviewPath, string $directory = 'products') : array
    {
        // If there is new file, delete the old one and upload new
        if ($newFile) {
            $this->deleteImages($oldImagePath, $oldImageSmallPath, $oldImagePreviewPath);
            return $this->uploadAsWebP($newFile, $directory);
        }

        // No nw image
        return [
            'image_url' => $oldImagePath,
            'image_small_url' => $oldImageSmallPath,
            'image_preview_url' => $oldImagePreviewPath, 
        ];
    }
}