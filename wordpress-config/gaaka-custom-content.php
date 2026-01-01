<?php
/**
 * GAAKA Custom Content Types & Fields
 * 
 * Add this to your WordPress theme's functions.php or create as a custom plugin
 * 
 * Installation:
 * 1. Copy this file to wp-content/plugins/gaaka-custom-content/gaaka-custom-content.php
 * 2. Create plugin header (see below)
 * 3. Activate in WordPress admin
 */

// Register Site Content Custom Post Type for global settings
function gaaka_register_site_content() {
    register_post_type('site_content', [
        'labels' => [
            'name' => 'Site Content',
            'singular_name' => 'Site Content',
            'add_new' => 'Add Content Block',
            'edit_item' => 'Edit Content Block',
            'menu_name' => 'Site Content'
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-admin-site-alt3',
        'show_in_graphql' => true,
        'graphql_single_name' => 'siteContent',
        'graphql_plural_name' => 'siteContents',
        'supports' => ['title', 'editor', 'revisions'],
        'capability_type' => 'post',
        'hierarchical' => false,
    ]);
}
add_action('init', 'gaaka_register_site_content');

// Register Artisan Stories Custom Post Type
function gaaka_register_artisan_stories() {
    register_post_type('artisan_story', [
        'labels' => [
            'name' => 'Artisan Stories',
            'singular_name' => 'Artisan Story',
            'add_new' => 'Add Story',
            'edit_item' => 'Edit Story',
            'menu_name' => 'Artisan Stories'
        ],
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-groups',
        'show_in_graphql' => true,
        'graphql_single_name' => 'artisanStory',
        'graphql_plural_name' => 'artisanStories',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'has_archive' => true,
        'rewrite' => ['slug' => 'artisan-stories'],
        'capability_type' => 'post',
        'hierarchical' => false,
    ]);
}
add_action('init', 'gaaka_register_artisan_stories');

// Add GraphQL support to product categories for descriptions
function gaaka_add_category_graphql_fields() {
    register_graphql_field('ProductCategory', 'longDescription', [
        'type' => 'String',
        'description' => 'Extended description for collection pages',
        'resolve' => function($category) {
            return get_term_meta($category->term_id, 'long_description', true);
        }
    ]);
}
add_action('graphql_register_types', 'gaaka_add_category_graphql_fields');

// Add meta box for category long description
function gaaka_add_category_fields($term) {
    $term_id = $term->term_id;
    $long_description = get_term_meta($term_id, 'long_description', true);
    ?>
    <tr class="form-field">
        <th scope="row">
            <label for="long_description">Long Description (for collection pages)</label>
        </th>
        <td>
            <textarea name="long_description" id="long_description" rows="5" cols="50" class="large-text"><?php echo esc_textarea($long_description); ?></textarea>
            <p class="description">Extended description shown on collection pages</p>
        </td>
    </tr>
    <?php
}
add_action('product_cat_edit_form_fields', 'gaaka_add_category_fields');

// Save category long description
function gaaka_save_category_fields($term_id) {
    if (isset($_POST['long_description'])) {
        update_term_meta($term_id, 'long_description', sanitize_textarea_field($_POST['long_description']));
    }
}
add_action('edited_product_cat', 'gaaka_save_category_fields');
add_action('create_product_cat', 'gaaka_save_category_fields');

/**
 * Plugin Header (if using as plugin):
 * 
 * Plugin Name: GAAKA Custom Content
 * Plugin URI: https://gaaka.com
 * Description: Custom content types and fields for GAAKA headless CMS
 * Version: 1.0.0
 * Author: GAAKA
 * Requires at least: 6.0
 * Requires PHP: 8.0
 */
