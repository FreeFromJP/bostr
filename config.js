"use strict";

// Bostr config

module.exports = {
  mode: "private",

  // Server listener [Required]
  address: "0.0.0.0",
  port: "8008",

  // Clusters.
  // 0 will make bostr run clusters with available parallelism / CPU cores.
  clusters: 0,
  // Numbers of idle sessions to be created
  // Default: 1
  idle_sessions: 1,

  // Log about bouncer connection with relays?
  log_about_relays: true,

  // Use deflate compression for websocket.
  // This could save user bandwidth.
  perMessageDeflate: true,

  // Reject scraper requests.
  // This only checks whenever client respond to bouncer's AUTH.
  //
  // NOTE: - Require NIP-42 compatible nostr client.
  //       - This will also block unauthorized EVENT.
  noscraper: false,

  // Time before reconnect to relays in milliseconds.
  reconnect_time: 3000,

  // Ratelimit expiration after ratelimit from upstream relay in miliseconds.
  // Setting as 0 will disable ratelimit handling.
  upstream_ratelimit_expiration: 10000,

  // Maximum incoming connections per IP.
  // By default, This is Infinity. Change the value as Integer (number) to override.
  max_conn_per_ip: Infinity,

  // Maximum subscriptions that client could open.
  // Setting as -1 will disable max subscription limit.
  max_client_subs: -1,

  // Maximum Known Events
  // Used for knowing what events has been forwarded to client in order to prevent duplicates to be forwarded.
  // This is only storing event IDs into memory (RAM), not an entire event blob.
  //
  // Setting as 0 will store known events to memory without limit until the subscription is closed.
  // Reduce this value if memory usage is high. But don't go too low as duplicates will be forwarded to client.
  max_known_events: 1000,

  // Wait for every connected relays send EOSE.
  // Could improve accuracy on received events.
  //
  // Depending on your configured relays,
  // It may could cause loading problems in client due to slow EOSE from bouncer.
  // You could try fix this by changing <max_eose_score> value.
  wait_eose: true,

  // Pause an subscription from receiving further events after reached to <filter.limit>
  // Enabling this could fix bandwidth issues at certain client.
  // This is also known as save mode.
  //
  // You may also need to adjust <max_eose_score>.
  pause_on_limit: true,

  // Maximum of received EOSE from relays to send EOSE to client.
  // Normally, waiting EOSE from 3 relays should be enough. Leaving it with 0 equals wait for every established relays.
  // NOTE: Please adjust this max score correctly with your configured relays.
  //       If you only setted up 3 relays, Set the <max_eose_score> as 0.
  // Tip : The bigger = The more accurate EOSE, The less = EOSE sent way earlier.
  max_eose_score: 3,

  // A whitelist of users public keys who could use this bouncer.
  // Leaving this empty will allows everyone to use this bouncer.
  // NOTE: - Require NIP-42 compatible nostr client
  authorized_keys: [],

  // Used for accessing NIP-42 protected events from certain relays.
  // It could be your key. Leaving this empty completely disables NIP-42 function.
  //
  // You could use this function even as a public bouncer.
  // There are no security risk as it utilize NIP-42 to recognize client public key.
  //
  // NOTE: - Require NIP-42 compatible nostr client
  private_keys: {
    // "pubkey-in-hex": "privatekey-in-hex",
    // "pubkey-in-hex": "nsec ....",
    // "npub ....": "privatekey-in-hex",
    // "npub ....": "nsec ...."
  },

  // Server information.
  // Only for when nostr client requesting server information.
  server_meta: {
    "contact": "unset",
    "pubkey": "0000000000000000000000000000000000000000000000000000000000000000",
    "description": "relay",
    "name": "nostr",
    "software": "secret",

    // Some nostr client may read the following for compatibility check.
    // You may change the supported_nips to match with what your relays supported.
    "supported_nips": [1,2,9,11,12,15,16,20,22,33,40,42,50],
    // "icon_url": ""
  },

  // Path to favicon file.
  favicon: "",

  // Nostr relays to bounce [Required]
  relays: [
    "ws://172.31.47.35:7777",
    "ws://172.31.45.30:7777",
  ],
  // Unless you use this bouncer only for load balancing,
  // You could empty <relays> as long <loadbalancer> is not empty.

  // Cache relays - Store received events to cache relay(s) (Optional).
  // Could improve the speed of event deliveries.
  //
  // Ensure that the cache relay does not have websocket ratelimit being set.
  // CAUTION: - Cache relay is intensive in storing events.
  //          - Only works best with only 1 cache relay.
  //          - Things may not work properly if you configure more than just a single cache relays.
  cache_relays: [
    // "ws://localhost:3000"
  ],

  // Load balancer - Load balance this bouncer (Optional)
  //
  // You could make this bouncer to connect to other bouncer in order to save this server loads.
  // It's suggested that the following bouncers does not have `noscraper` or `authorized_keys` being set.
  //
  // NOTE: Ensure that these bouncers has the same relays list as the other bouncers did,
  //       Otherwise the listing page of this http server will be inaccurate.
  //
  // NOTE: Ensure that these bouncer's <max_conn_per_ip> is set as "Infinity"
  //       If you want to handle <max_conn_per_ip>, Set in here instead
  //
  // ATTENTION: This load balancer is ONLY designed for bouncers in mind.
  //            If you REALLY want to use it with your relays, Ensure that
  //            Every single relays that you provide below is using the same database as the others did.
  loadbalancer: [
    // "wss://bostr1.example.com",
    // "wss://bostr2.example.com",
    // "wss://bostr3.example.com",
    // ...and so on
  ],

  // User agent to use on upstream connection.
  user_agent: "Bostr (https://codeberg.org/Yonle/bostr) on wss://bostr.example.com - A nostr relay proxy aggregator"
}
