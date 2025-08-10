package backend.controller;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    public UserModel newUserModel(@RequestBody UserModel newUserModel) {
        return userRepository.save(newUserModel);
    }

    //User login
    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody UserModel loginDetails) {
        UserModel user = userRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(()->new UserNotFoundException("User not found :"+loginDetails.getEmail()));
        if(user.getPassword().equals(loginDetails.getPassword())) {
            Map<String,Object> response  = new HashMap<>();
            response.put("message","login successful");
            response.put("id",user.getId());
            return ResponseEntity.ok(response);
        }else{
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","invalid creat failed"));
        }
    }

    @GetMapping("/user")
    List<UserModel> findAll() {
        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    UserModel getUserById(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
    }
    @PutMapping("user/{id}")
    UserModel updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id){
        return userRepository.findById(id).map(userModel -> {
            userModel.setFullname(newUserModel.getFullname());
            userModel.setEmail(newUserModel.getEmail());
            userModel.setPassword(newUserModel.getPassword());
            userModel.setPhone(newUserModel.getPhone());
            return userRepository.save(userModel);


        }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUserById(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User account" + id + " deleted ";
    }
    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String email){
        return userRepository.existsByEmail(email);
    }


}

