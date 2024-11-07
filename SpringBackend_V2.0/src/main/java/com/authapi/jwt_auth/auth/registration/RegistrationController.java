package com.authapi.jwt_auth.auth.registration;

import com.authapi.jwt_auth.user.Projects;
import com.authapi.jwt_auth.user.ProjectsRepository;
import com.authapi.jwt_auth.user.User;
import com.authapi.jwt_auth.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "api/v1/auth/register")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
    @GetMapping(path = "/test")
    public String testthis() {
        return "hello there";
    }


    //this is just to test 

    @PostMapping
    public String createProject(@RequestBody Projects entity) {
        System.out.println("create new project\n");

        // save Project
        var project=Projects.builder()
                .project_name(entity.getProject_name())
                        .project_description(entity.getProject_description())
                                .build();

        System.out.println("\nSaved Project :: " + project + "\n");
        return "Project saved!!!";
    }


    @PostMapping("/assignProjectToEmployees/{projId}/{empId}")
    public String assignProjectToEmployees(@PathVariable(name = "projId") Integer projId,
                                           @PathVariable(name = "empId") Integer empId) {
        System.out.println("\nFetch existing Project and  add existing user into this Project." + "\n");

        // get Employee
        UserRepository userrepo;
        Optional<User> user_res = userrepo.findUserById(empId);
        System.out.println("\nEmployee details :: " + user_res.stream() + "\n");

        // new Project
        ProjectsRepository projectsrepo;

        Optional<Projects> project = projectsrepo.findByProject_id(projId);
        System.out.println("\nProject details :: " + project.get().getProject_name() + "\n");

        // create Employee set
        Set<Optional<User>> users = new HashSet<>();
        users.add(user_res);

        // assign Employee Set to Project
        project.set(employees);

        // save Project
        project = projectRepository.save(project);
        System.out.println("\nSaved Project :: " + project + "\n");

        return "Project saved!!!";
    }





}