<?php

    function __autoload( $class )
    {
        $classPath = explode( '\\', $class );
        $classPath[0] = __DIR__;
        $path = implode( DIRECTORY_SEPARATOR, $classPath ) . ".php";
        if ( file_exists( $path ) )
            require $path;
    }