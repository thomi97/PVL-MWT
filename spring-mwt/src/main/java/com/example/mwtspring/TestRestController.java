package com.example.mwtspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/apartments")
@CrossOrigin(origins = "*")
public class TestRestController {

    private final ApartmentService apartmentService;

    @Autowired
    public TestRestController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    List<Apartment> apartmentList = new ArrayList<>();

    @GetMapping("/list")
    public ResponseEntity<List<String>> getApartments() {
        List<Apartment> apartmentList = apartmentService.getAllApartments();
        List<String> returnList;

        if (apartmentList.isEmpty())
            return ResponseEntity.ok(List.of());
        else
            returnList = apartmentList.stream()
                    .map(Apartment::getApartmentName)
                    .toList();

        return ResponseEntity.ok(returnList);
    }

    @RequestMapping(value = "/get/{name}", method = RequestMethod.GET)
    public ResponseEntity<String> getApartmentById(@PathVariable String name) {
        Apartment apartment = apartmentService.getApartment(name);

        if (apartment != null) {
            return ResponseEntity.ok(apartment.getApartmentName());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/addApartment")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createString(@RequestBody String apartmentName) {
        System.out.println("Creating apartment " + apartmentName);
        Apartment apartment = new Apartment();
        apartment.setApartmentName(apartmentName);
        if (apartmentList.contains(apartment)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Apartment " + apartmentName + " already exists");
        } else {
            apartmentService.createApartment(apartment);
            apartmentList.add(apartment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Apartment " + apartmentName + " created successfully");
        }
    }

    @DeleteMapping("/delete/{name}")
    public ResponseEntity<String> deleteApartment(@PathVariable String name) {
        Apartment apartment = apartmentService.getApartment(name);
        if (apartment != null) {
            apartmentService.deleteApartment(name);
            return ResponseEntity.ok("Apartment " + name + " deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
