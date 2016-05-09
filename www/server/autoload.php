<?php

    function __autoload( $class )
    {
        $name = explode( '\\', $class );
        $name[0] = __DIR__;

        $path = implode( DIRECTORY_SEPARATOR, $name ) . '.php';

        if ( file_exists( $path ) ) {
            require $path;
        }
    }