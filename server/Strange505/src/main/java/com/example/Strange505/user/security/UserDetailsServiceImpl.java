package com.example.Strange505.user.security;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Can't find user with this email. -> " + email));

        if(findUser != null){
            UserDetailsImpl userDetails = new UserDetailsImpl(findUser);
            return  userDetails;
        }

        return null;
    }
}
