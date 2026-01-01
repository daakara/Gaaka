<?php
/**
 * Plugin Name: GAAKA Preview Link
 * Plugin URI: https://gaaka.com
 * Description: Adds preview links to Next.js site in WordPress admin bar for easy product previewing
 * Version: 1.0.0
 * Author: GAAKA
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Add preview links to WordPress admin bar
 */
function gaaka_add_preview_links($wp_admin_bar) {
    global $post;
    
    // Get the Next.js site URL from settings or use default
    $nextjs_url = get_option('gaaka_nextjs_url', 'https://gaaka.vercel.app');
    
    // Add main shop preview link (always visible)
    $wp_admin_bar->add_node(array(
        'id' => 'gaaka-shop',
        'title' => '🛍️ View Live Shop',
        'href' => $nextjs_url . '/collections/all',
        'meta' => array(
            'target' => '_blank',
            'title' => 'View your live Next.js shop'
        )
    ));
    
    // Add product-specific preview link (only on product edit screen)
    if (is_admin() && isset($_GET['post']) && get_post_type($_GET['post']) == 'product') {
        $product_id = $_GET['post'];
        $product = wc_get_product($product_id);
        
        if ($product) {
            $product_slug = $product->get_slug();
            
            $wp_admin_bar->add_node(array(
                'id' => 'gaaka-product-preview',
                'parent' => 'gaaka-shop',
                'title' => '👁️ Preview This Product',
                'href' => $nextjs_url . '/products/' . $product_slug,
                'meta' => array(
                    'target' => '_blank',
                    'title' => 'Preview this product on Next.js site'
                )
            ));
        }
    }
    
    // Add category preview (only on category edit screen)
    if (is_admin() && isset($_GET['tag_ID']) && isset($_GET['taxonomy']) && $_GET['taxonomy'] == 'product_cat') {
        $term_id = $_GET['tag_ID'];
        $term = get_term($term_id, 'product_cat');
        
        if ($term && !is_wp_error($term)) {
            $category_slug = $term->slug;
            
            // Map WordPress category slugs to Next.js collection routes
            $category_map = array(
                'storage-baskets' => '/collections/storage-baskets',
                'kitchen-dining' => '/collections/kitchen-dining',
                'kitchen-and-dining' => '/collections/kitchen-dining',
                'wall-baskets' => '/collections/wall-baskets',
            );
            
            $collection_path = isset($category_map[$category_slug]) 
                ? $category_map[$category_slug] 
                : '/collections/' . $category_slug;
            
            $wp_admin_bar->add_node(array(
                'id' => 'gaaka-category-preview',
                'parent' => 'gaaka-shop',
                'title' => '📂 Preview This Category',
                'href' => $nextjs_url . $collection_path,
                'meta' => array(
                    'target' => '_blank',
                    'title' => 'Preview this category on Next.js site'
                )
            ));
        }
    }
    
    // Add homepage preview
    $wp_admin_bar->add_node(array(
        'id' => 'gaaka-homepage',
        'parent' => 'gaaka-shop',
        'title' => '🏠 Homepage',
        'href' => $nextjs_url,
        'meta' => array(
            'target' => '_blank',
            'title' => 'View Next.js homepage'
        )
    ));
}
add_action('admin_bar_menu', 'gaaka_add_preview_links', 100);

/**
 * Add settings page for Next.js URL
 */
function gaaka_add_settings_page() {
    add_options_page(
        'GAAKA Preview Settings',
        'GAAKA Preview',
        'manage_options',
        'gaaka-preview-settings',
        'gaaka_render_settings_page'
    );
}
add_action('admin_menu', 'gaaka_add_settings_page');

/**
 * Render settings page
 */
function gaaka_render_settings_page() {
    if (isset($_POST['gaaka_nextjs_url'])) {
        check_admin_referer('gaaka_settings_update', 'gaaka_settings_nonce');
        update_option('gaaka_nextjs_url', esc_url_raw($_POST['gaaka_nextjs_url']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $nextjs_url = get_option('gaaka_nextjs_url', 'https://gaaka.vercel.app');
    ?>
    <div class="wrap">
        <h1>GAAKA Preview Settings</h1>
        <form method="post">
            <?php wp_nonce_field('gaaka_settings_update', 'gaaka_settings_nonce'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="gaaka_nextjs_url">Next.js Site URL</label>
                    </th>
                    <td>
                        <input 
                            type="url" 
                            name="gaaka_nextjs_url" 
                            id="gaaka_nextjs_url" 
                            value="<?php echo esc_attr($nextjs_url); ?>" 
                            class="regular-text"
                            placeholder="https://gaaka.vercel.app"
                        />
                        <p class="description">
                            The URL of your Next.js frontend site (no trailing slash)
                        </p>
                    </td>
                </tr>
            </table>
            <p class="submit">
                <input type="submit" class="button button-primary" value="Save Settings" />
            </p>
        </form>
        
        <hr>
        
        <h2>Quick Links</h2>
        <p>
            <a href="<?php echo esc_url($nextjs_url); ?>" target="_blank" class="button">
                🏠 View Homepage
            </a>
            <a href="<?php echo esc_url($nextjs_url . '/collections/all'); ?>" target="_blank" class="button">
                🛍️ View Shop
            </a>
        </p>
        
        <h2>About</h2>
        <p>
            This plugin adds preview links to your WordPress admin bar, making it easy to see how 
            your products look on the live Next.js site.
        </p>
        <ul style="list-style: disc; margin-left: 20px;">
            <li>When editing a product, you'll see "Preview This Product" link</li>
            <li>When editing a category, you'll see "Preview This Category" link</li>
            <li>"View Live Shop" is always visible in the admin bar</li>
        </ul>
    </div>
    <?php
}

/**
 * Add product quick actions (on product list page)
 */
function gaaka_add_product_row_actions($actions, $post) {
    if ($post->post_type == 'product') {
        $nextjs_url = get_option('gaaka_nextjs_url', 'https://gaaka.vercel.app');
        $product = wc_get_product($post->ID);
        
        if ($product) {
            $product_slug = $product->get_slug();
            $actions['gaaka_preview'] = sprintf(
                '<a href="%s" target="_blank">🔍 Preview on Site</a>',
                esc_url($nextjs_url . '/products/' . $product_slug)
            );
        }
    }
    
    return $actions;
}
add_filter('post_row_actions', 'gaaka_add_product_row_actions', 10, 2);

/**
 * Add custom column to products list
 */
function gaaka_add_preview_column($columns) {
    $new_columns = array();
    
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        
        // Add preview column after name
        if ($key === 'name') {
            $new_columns['gaaka_preview'] = '👁️ Preview';
        }
    }
    
    return $new_columns;
}
add_filter('manage_product_posts_columns', 'gaaka_add_preview_column');

/**
 * Populate preview column
 */
function gaaka_populate_preview_column($column, $post_id) {
    if ($column === 'gaaka_preview') {
        $nextjs_url = get_option('gaaka_nextjs_url', 'https://gaaka.vercel.app');
        $product = wc_get_product($post_id);
        
        if ($product) {
            $product_slug = $product->get_slug();
            echo sprintf(
                '<a href="%s" target="_blank" class="button button-small" title="Preview on Next.js">👁️</a>',
                esc_url($nextjs_url . '/products/' . $product_slug)
            );
        }
    }
}
add_action('manage_product_posts_custom_column', 'gaaka_populate_preview_column', 10, 2);
