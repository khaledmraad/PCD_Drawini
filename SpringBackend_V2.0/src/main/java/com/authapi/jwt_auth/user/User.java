package com.authapi.jwt_auth.user;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Set;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;



    @Enumerated(EnumType.STRING)
    private Role role;

    @ColumnDefault("0")
    @Column(name = "enable")
    private Integer enable;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password ;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    //    @ManyToMany(cascade = {
    //            CascadeType.PERSIST,
    //            CascadeType.MERGE
    //    })
    //    @JoinTable(
    //            name = "users_projects_mapping",
    //            joinColumns = @JoinColumn(name = "id"),
    //            inverseJoinColumns = @JoinColumn(name = "project_id")
    //    )
    //    private Set<Projects> projects;
    //
    //    public Set<Projects> getProjects() { return projects; }
    //
    //    public void setProjects(Set<Projects> projects) { this.projects = projects; }

    // public void addProject(Project project) {
    //     this.projects.add(project);
    // }

}