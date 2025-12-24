<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Footer variables to be printed on the mustache template
 *
 * @package   theme_stream
 * @copyright 2022 Hugo Ribeiro
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $OUTPUT;

$themesettings = get_config('theme_stream');

$templatecontext['year'] = date('Y');
$templatecontext['facebookurl'] = $themesettings->facebookurl;
$templatecontext['instagramurl'] = $themesettings->instagramurl;
$templatecontext['pinteresturl'] = $themesettings->pinteresturl;
$templatecontext['youtubeurl'] = $themesettings->youtubeurl;
$templatecontext['linkedinurl'] = $themesettings->linkedinurl;
$templatecontext['twitterurl'] = $themesettings->twitterurl;
$templatecontext['leftcolumn'] = format_text($themesettings->leftcolumn, FORMAT_HTML);
$templatecontext['centercolumn'] = format_text($themesettings->centercolumn, FORMAT_HTML);

// MatCon Footer Logos URLs
$templatecontext['logofcfmurl'] = isset($themesettings->logofcfmurl) ? $themesettings->logofcfmurl : 'https://ingenieria.uchile.cl';
$templatecontext['logocmmeduurl'] = isset($themesettings->logocmmeduurl) ? $themesettings->logocmmeduurl : 'https://cmmedu.uchile.cl';
$templatecontext['logomineducurl'] = isset($themesettings->logomineducurl) ? $themesettings->logomineducurl : 'https://www.mineduc.cl';
$templatecontext['logoreactivacionurl'] = isset($themesettings->logoreactivacionurl) ? $themesettings->logoreactivacionurl : 'https://reactivacioneducativa.mineduc.cl/';
$templatecontext['logounescurl'] = isset($themesettings->logounescurl) ? $themesettings->logounescurl : 'https://www.unesco.org';

// MatCon Footer Logos Images URLs
$templatecontext['logofcfmimg'] = $OUTPUT->image_url('matcon/logo_fcfm', 'theme');
$templatecontext['logocmmeduimg'] = $OUTPUT->image_url('matcon/logo_cmmedu', 'theme');
$templatecontext['logomineducimg'] = $OUTPUT->image_url('matcon/logo_mineduc', 'theme');
$templatecontext['logoreactivacionimg'] = $OUTPUT->image_url('matcon/logo_reactivacion', 'theme');
$templatecontext['logounescimg'] = $OUTPUT->image_url('matcon/logo_unesco', 'theme');

// MatCon Top Header Logo
$templatecontext['logomatconimg'] = $OUTPUT->image_url('matcon/logo_matcon', 'theme');
