package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    private final String UPLOAD_DIR = "src/main/uploads/";

    // Get all items
    @GetMapping
    public List<InventoryModel> getAllItems() {
        return inventoryRepository.findAll();
    }

    // Get item by id
    @GetMapping("/{id}")
    public InventoryModel getItemById(@PathVariable Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // Update item by id - simple JSON body without file upload
    @PutMapping("/{id}")
    public ResponseEntity<InventoryModel> updateItem(
            @RequestBody InventoryModel updatedItem,
            @PathVariable Long id
    ) {
        InventoryModel existingItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        existingItem.setItemId(updatedItem.getItemId());
        existingItem.setItemName(updatedItem.getItemName());
        existingItem.setItemCategory(updatedItem.getItemCategory());
        existingItem.setItemQty(updatedItem.getItemQty());
        existingItem.setItemDetails(updatedItem.getItemDetails());
        // Note: If you want to update image, do separately or extend this

        InventoryModel savedItem = inventoryRepository.save(existingItem);

        return ResponseEntity.ok(savedItem);
    }

    // Serve image
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getFile(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    // Delete item
    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        InventoryModel inventoryItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        String itemImage = inventoryItem.getItemImage();
        if (itemImage != null && !itemImage.isEmpty()) {
            File imageFile = new File(UPLOAD_DIR + itemImage);
            if (imageFile.exists() && imageFile.delete()) {
                System.out.println("Image deleted.");
            }
        }

        inventoryRepository.deleteById(id);
        return "Item with ID " + id + " deleted.";
    }

    // Create new item (Add Item)
    @PostMapping(consumes = "multipart/form-data")
    public InventoryModel createItem(
            @RequestPart("itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        InventoryModel newItem = mapper.readValue(itemDetails, InventoryModel.class);

        if (file != null && !file.isEmpty()) {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            file.transferTo(Paths.get(UPLOAD_DIR + filename));
            newItem.setItemImage(filename);
        }

        return inventoryRepository.save(newItem);
    }


}
