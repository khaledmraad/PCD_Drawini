//package com.authapi.jwt_auth.user;
//
//import jakarta.persistence.*;
//import lombok.*;
//import org.hibernate.annotations.ColumnDefault;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.time.Instant;
//import java.util.Collection;
//import java.util.List;
//import java.util.Set;
//
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@Entity
//@Table(name = "projects")
//public class Projects {
//
//    @Id
//    @GeneratedValue
//    private Integer project_id;
//
//
//    private String project_name;
//
//    private String project_description;
//
//    /*private String project_status;
//
//    private String project_createdAt;
//
//    private String project_updatedAt;*/
//
//
//    @Getter
//    @Setter
//    @ManyToMany(cascade = {
//            CascadeType.PERSIST,
//            CascadeType.MERGE
//    })
//    @JoinTable(
//            name = "users_projects_mapping",
//            joinColumns = @JoinColumn(name = "project_id"),
//            inverseJoinColumns = @JoinColumn(name = "id")
//    )
//    private Set<User> users;
//
//    public Set<User> getUsers() { return users; }
//    public void setEmployees(Set<User> employees) { this.users = employees; }
//
//
//    public Projects( String name, String description) {
//        this.project_name = name;
//        this.project_description = description;
//        /*this.project_status = status;
//        this.project_createdAt = createdAt;
//        this.project_updatedAt = updatedAt;*/
//    }
//
//
//
//}
