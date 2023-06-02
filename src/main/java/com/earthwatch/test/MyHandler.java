package com.earthwatch.test;

import java.util.function.Function;

public class MyHandler implements Function<String, String> {
    @Override
    public String apply(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
