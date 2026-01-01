<?php
/**
 * Plugin Name: GAAKA Dashboard Widget
 * Description: Shows Next.js site status and quick actions in WordPress dashboard
 * Version: 1.0.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add GAAKA dashboard widget
 */
function gaaka_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'gaaka_dashboard_widget',
        '🛍️ GAAKA Live Site Status',
        'gaaka_render_dashboard_widget'
    );
}
add_action('wp_dashboard_setup', 'gaaka_add_dashboard_widget');

/**
 * Render dashboard widget content
 */
function gaaka_render_dashboard_widget() {
    $nextjs_url = get_option('gaaka_nextjs_url', 'https://gaaka.vercel.app');
    
    // Get product counts
    $total_products = wp_count_posts('product')->publish;
    $draft_products = wp_count_posts('product')->draft;
    $featured_products = count(wc_get_featured_product_ids());
    
    // Get category count
    $categories = get_terms(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
    ));
    $category_count = is_array($categories) ? count($categories) : 0;
    
    ?>
    <div class="gaaka-dashboard-widget">
        <style>
            .gaaka-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin: 15px 0;
            }
            .gaaka-stat {
                background: #f0f0f1;
                padding: 15px;
                border-radius: 4px;
                text-align: center;
            }
            .gaaka-stat-number {
                font-size: 32px;
                font-weight: bold;
                color: #2271b1;
                display: block;
            }
            .gaaka-stat-label {
                font-size: 13px;
                color: #646970;
                margin-top: 5px;
            }
            .gaaka-actions {
                display: flex;
                gap: 8px;
                margin-top: 15px;
                flex-wrap: wrap;
            }
            .gaaka-actions .button {
                flex: 1;
                text-align: center;
                min-width: 120px;
            }
            .gaaka-status {
                background: #d5f4e6;
                border-left: 4px solid #00a32a;
                padding: 10px;
                margin-bottom: 15px;
            }
            .gaaka-status.warning {
                background: #fcf9e8;
                border-left-color: #dba617;
            }
        </style>
        
        <?php if ($total_products > 0): ?>
            <div class="gaaka-status">
                <strong>✅ Site is Live!</strong><br>
                Products are syncing to your Next.js site every hour.
            </div>
        <?php else: ?>
            <div class="gaaka-status warning">
                <strong>⚠️ No Products Yet</strong><br>
                Add your first product to see it on the live site!
            </div>
        <?php endif; ?>
        
        <div class="gaaka-stats">
            <div class="gaaka-stat">
                <span class="gaaka-stat-number"><?php echo $total_products; ?></span>
                <span class="gaaka-stat-label">Published Products</span>
            </div>
            <div class="gaaka-stat">
                <span class="gaaka-stat-number"><?php echo $featured_products; ?></span>
                <span class="gaaka-stat-label">Featured Products</span>
            </div>
            <div class="gaaka-stat">
                <span class="gaaka-stat-number"><?php echo $category_count; ?></span>
                <span class="gaaka-stat-label">Categories</span>
            </div>
            <div class="gaaka-stat">
                <span class="gaaka-stat-number"><?php echo $draft_products; ?></span>
                <span class="gaaka-stat-label">Draft Products</span>
            </div>
        </div>
        
        <div class="gaaka-actions">
            <a href="<?php echo admin_url('post-new.php?post_type=product'); ?>" class="button button-primary">
                ➕ Add Product
            </a>
            <a href="<?php echo admin_url('edit.php?post_type=product'); ?>" class="button">
                📦 Manage Products
            </a>
            <a href="<?php echo esc_url($nextjs_url); ?>" target="_blank" class="button">
                👁️ View Live Site
            </a>
        </div>
        
        <hr style="margin: 15px 0;">
        
        <p><strong>🚀 Quick Links:</strong></p>
        <ul style="margin: 5px 0;">
            <li>
                <a href="<?php echo esc_url($nextjs_url . '/collections/all'); ?>" target="_blank">
                    Shop Page
                </a>
            </li>
            <li>
                <a href="<?php echo admin_url('edit-tags.php?taxonomy=product_cat&post_type=product'); ?>">
                    Manage Categories
                </a>
            </li>
            <li>
                <a href="<?php echo admin_url('upload.php'); ?>">
                    Media Library
                </a>
            </li>
            <li>
                <a href="<?php echo admin_url('admin.php?page=wc-settings'); ?>">
                    WooCommerce Settings
                </a>
            </li>
        </ul>
        
        <p style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #646970;">
            💡 <strong>Tip:</strong> Products sync to Next.js every hour via ISR. 
            For immediate updates, trigger a deployment in Vercel.
        </p>
    </div>
    <?php
}

/**
 * Add helpful notices for new users
 */
function gaaka_admin_notices() {
    $screen = get_current_screen();
    
    // Show setup notice if no products exist
    $product_count = wp_count_posts('product')->publish;
    
    if ($product_count === 0 && $screen->id === 'dashboard') {
        $dismissed = get_option('gaaka_setup_notice_dismissed', false);
        
        if (!$dismissed) {
            ?>
            <div class="notice notice-info is-dismissible gaaka-setup-notice">
                <h3>👋 Welcome to GAAKA Product Management!</h3>
                <p>Your WordPress is connected to your Next.js site. Here's what to do next:</p>
                <ol>
                    <li>
                        <strong>Add Products:</strong> 
                        <a href="<?php echo admin_url('post-new.php?post_type=product'); ?>">Create your first product</a>
                    </li>
                    <li>
                        <strong>Organize Categories:</strong> 
                        <a href="<?php echo admin_url('edit-tags.php?taxonomy=product_cat&post_type=product'); ?>">Set up product categories</a>
                    </li>
                    <li>
                        <strong>Preview:</strong> Install the GAAKA Preview plugin to see products on your live site
                    </li>
                    <li>
                        <strong>Configure Payments:</strong> 
                        <a href="<?php echo admin_url('admin.php?page=wc-settings&tab=checkout'); ?>">Set up Stripe/PayPal</a>
                    </li>
                </ol>
                <p>
                    <a href="<?php echo admin_url('post-new.php?post_type=product'); ?>" class="button button-primary">
                        Add Your First Product
                    </a>
                    <button type="button" class="button gaaka-dismiss-notice">
                        Dismiss
                    </button>
                </p>
            </div>
            <script>
                jQuery(document).ready(function($) {
                    $('.gaaka-dismiss-notice').on('click', function() {
                        $.post(ajaxurl, {
                            action: 'gaaka_dismiss_setup_notice',
                            nonce: '<?php echo wp_create_nonce('gaaka_dismiss_notice'); ?>'
                        });
                        $('.gaaka-setup-notice').fadeOut();
                    });
                    
                    // Also handle the default dismiss button
                    $('.gaaka-setup-notice .notice-dismiss').on('click', function() {
                        $.post(ajaxurl, {
                            action: 'gaaka_dismiss_setup_notice',
                            nonce: '<?php echo wp_create_nonce('gaaka_dismiss_notice'); ?>'
                        });
                    });
                });
            </script>
            <?php
        }
    }
}
add_action('admin_notices', 'gaaka_admin_notices');

/**
 * Handle dismiss notice AJAX
 */
function gaaka_dismiss_setup_notice_handler() {
    check_ajax_referer('gaaka_dismiss_notice', 'nonce');
    update_option('gaaka_setup_notice_dismissed', true);
    wp_send_json_success();
}
add_action('wp_ajax_gaaka_dismiss_setup_notice', 'gaaka_dismiss_setup_notice_handler');
