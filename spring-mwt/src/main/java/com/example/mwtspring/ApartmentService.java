package com.example.mwtspring;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApartmentService {

        private final ApartmentRepository apartmentRepository;

        public ApartmentService(ApartmentRepository apartmentRepository) {
            this.apartmentRepository = apartmentRepository;
        }

        public void createApartment(Apartment apartment) {
            apartmentRepository.save(apartment);
        }

        public Apartment getApartment(String apartmentName) {
            return apartmentRepository.findById(apartmentName).orElse(null);
        }

        public List<Apartment> getAllApartments() {
            return apartmentRepository.findAll();
        }

        public void deleteApartment(String apartmentName) {
            apartmentRepository.deleteById(apartmentName);
        }
}
