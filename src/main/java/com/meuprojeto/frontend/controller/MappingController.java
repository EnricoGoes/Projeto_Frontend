package com.meuprojeto.frontend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MappingController {

    @Autowired
    
    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
        
    }

    @GetMapping("/cadastro")
    public ModelAndView cadastrar() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("cadastro");
        return mv;
    }

    @GetMapping("/dashboard")
    public ModelAndView dashboard() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("dashboard");
        return mv;
    }

}
