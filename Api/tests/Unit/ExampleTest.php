<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testExample()
    {
        $calculator = 0;
        $result = $calculator + 5;
        $this->assertEquals(5, $result);
    }
}
