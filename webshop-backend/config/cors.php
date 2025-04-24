<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Ensure this is an array

    'allowed_origins' => ['*'], // Ensure this is an array

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Ensure this is an array

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
