package com.tareksaidee.NewSocial.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer, ApplicationContextAware {

    private ApplicationContext applicationContext;
    private static final String UTF8 = "UTF-8";


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }


    @Bean
    public ThymeleafViewResolver javascriptThymeleafViewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding(UTF8);
        resolver.setContentType("application/javascript");
        resolver.setViewNames(new String[]{"*.js"});
        resolver.setCache(false);
        return resolver;
    }

    @Bean
    public SpringResourceTemplateResolver javascriptTemplateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(this.applicationContext);
        resolver.setPrefix("classpath:templates/js/");
        resolver.setTemplateMode(TemplateMode.JAVASCRIPT);
        resolver.setCharacterEncoding(UTF8);
        resolver.setCheckExistence(true);
        resolver.setCacheable(false);
        return resolver;
    }

    //    @Bean
//    public ViewResolver htmlViewResolver() {
//        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
//        resolver.setTemplateEngine(templateEngine());
//        resolver.setContentType("text/html");
//        resolver.setCharacterEncoding(CHARACTER_ENCODING);
//        resolver.setViewNames(new String[] { "*.html" });
//        return resolver;
//    }
//
//    @Bean
//    public ViewResolver javascriptViewResolver() {
//        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
//        resolver.setTemplateEngine(templateEngine());
//        resolver.setContentType("application/javascript");
//        resolver.setCharacterEncoding(CHARACTER_ENCODING);
//        resolver.setViewNames(new String[] { "*.js" });
//        return resolver;
//    }
//
    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setMessageSource(messageSource());
        engine.addTemplateResolver(htmlTemplateResolver());
        engine.addTemplateResolver(javascriptTemplateResolver());
        return engine;
    }

    private ITemplateResolver htmlTemplateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setOrder(0);
        resolver.setCheckExistence(true);
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("classpath:templates/");
        resolver.setCacheable(false);
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setSuffix(".html");
        return resolver;
    }

    //    public ITemplateResolver javascriptTemplateResolver() {
//        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
//        resolver.setApplicationContext(applicationContext);
//        resolver.setOrder(1);
//        resolver.setCheckExistence(true);
//        resolver.setPrefix("classpath:/src/main/js/");
//        resolver.setCacheable(false);
//        resolver.setTemplateMode(TemplateMode.JAVASCRIPT);
//        return resolver;
//    }
//
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource msgSource = new ResourceBundleMessageSource();
        msgSource.setAlwaysUseMessageFormat(false);
        msgSource.setBasename("messages");
        msgSource.setDefaultEncoding(UTF8);
        msgSource.setFallbackToSystemLocale(true);
        msgSource.setUseCodeAsDefaultMessage(false);
        return msgSource;
    }
}
