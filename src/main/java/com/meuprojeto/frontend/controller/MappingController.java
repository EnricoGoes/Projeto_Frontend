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

    @GetMapping("/perfil")
    public ModelAndView perfil() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("perfil");
        return mv;
    }

    @GetMapping("/cadastrarConta")
    public ModelAndView cadastrarConta() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("conta");
        return mv;
    }

    @GetMapping("/cadastrarCategoria")
    public ModelAndView cadastrarCategoria() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("categoria");
        return mv;
    }

    @GetMapping("/parcelas")
    public ModelAndView parcelas() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("parcelas");
        return mv;
    }

}
