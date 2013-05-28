<?php
echo 'From Hoa';
require 'C:/Users/Julien/Desktop/Launchee/hoa/Core/Core.php';

from('Hoa')
-> import('File.Read')
-> import('Xyl.~')
-> import('Xyl.Interpreter.Html.~')
-> import('Http.Response');

$xyl = new Hoa\Xyl(
    new Hoa\File\Read('Main.xyl'),
    new Hoa\Http\Response(),
    new Hoa\Xyl\Interpreter\Html()
);
$xyl->render();
