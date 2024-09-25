var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useLoaderData, Link, useRouteError, useFetcher, useActionData, Form } from "@remix-run/react";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { isbot } from "isbot";
import "@shopify/shopify-app-remix/adapters/node";
import { shopifyApp, ApiVersion, AppDistribution, boundary, LoginErrorType } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import { PrismaClient } from "@prisma/client";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Page, Layout, Card, BlockStack, Text, Link as Link$1, List, Box, InlineStack, Button, Tooltip, AppProvider as AppProvider$1, FormLayout, TextField, FullscreenBar, Badge, ButtonGroup } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  future: {
    unstable_newEmbeddedAuthStrategy: true
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
ApiVersion.July24;
const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
const authenticate = shopify.authenticate;
shopify.unauthenticated;
const login = shopify.login;
shopify.registerWebhooks;
shopify.sessionStorage;
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function App$1() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1
}, Symbol.toStringTag, { value: "Module" }));
const polarisStyles = "/assets/styles-DT9i95_b.css";
const links$1 = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$4 = async ({ request }) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};
function App() {
  const { apiKey } = useLoaderData();
  return /* @__PURE__ */ jsxs(AppProvider, { isEmbeddedApp: true, apiKey, children: [
    /* @__PURE__ */ jsxs(NavMenu, { children: [
      /* @__PURE__ */ jsx(Link, { to: "/app", rel: "home", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/app/additional", children: "Additional page" }),
      /* @__PURE__ */ jsx(Link, { to: "/app/test", children: "Test page" })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
function ErrorBoundary() {
  return boundary.error(useRouteError());
}
const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: App,
  headers,
  links: links$1,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function AdditionalPage() {
  return /* @__PURE__ */ jsxs(Page, { children: [
    /* @__PURE__ */ jsx(TitleBar, { title: "Additional page" }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxs(Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ jsx(
            Link$1,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: true,
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsxs(Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ jsx(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ jsx(Code, { children: "<NavMenu>" }),
          " component found in ",
          /* @__PURE__ */ jsx(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ jsx(List, { children: /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(
          Link$1,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: true,
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ jsx(
    Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ jsx("code", { children })
    }
  );
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdditionalPage
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};
const action$2 = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`
        }
      }
    }
  );
  const responseJson = await response.json();
  const variantId = responseJson.data.productCreate.product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
      mutation shopifyRemixTemplateUpdateVariant($input: ProductVariantInput!) {
        productVariantUpdate(input: $input) {
          productVariant {
            id
            price
            barcode
            createdAt
          }
        }
      }`,
    {
      variables: {
        input: {
          id: variantId,
          price: Math.random() * 100
        }
      }
    }
  );
  const variantResponseJson = await variantResponse.json();
  return json({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantUpdate.productVariant
  });
};
function Index$1() {
  var _a2, _b, _c, _d;
  const fetcher = useFetcher();
  const shopify2 = useAppBridge();
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";
  const productId = (_b = (_a2 = fetcher.data) == null ? void 0 : _a2.product) == null ? void 0 : _b.id.replace(
    "gid://shopify/Product/",
    ""
  );
  useEffect(() => {
    if (productId) {
      shopify2.toast.show("Product created");
    }
  }, [productId, shopify2]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });
  return /* @__PURE__ */ jsxs(Page, { children: [
    /* @__PURE__ */ jsx(TitleBar, { title: "Remix app template", children: /* @__PURE__ */ jsx("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }) }),
    /* @__PURE__ */ jsx(BlockStack, { gap: "500", children: /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(BlockStack, { gap: "500", children: [
          /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
            /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app 🎉" }),
            /* @__PURE__ */ jsxs(Text, { variant: "bodyMd", as: "p", children: [
              "This embedded app template uses",
              " ",
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://shopify.dev/docs/apps/tools/app-bridge",
                  target: "_blank",
                  removeUnderline: true,
                  children: "App Bridge"
                }
              ),
              " ",
              "interface examples like an",
              " ",
              /* @__PURE__ */ jsx(Link$1, { url: "/app/additional", removeUnderline: true, children: "Additional page in the app nav" }),
              ", as well as an",
              " ",
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: true,
                  children: "Admin GraphQL"
                }
              ),
              " ",
              "mutation demo, to provide a starting point for app development."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
            /* @__PURE__ */ jsx(Text, { as: "h3", variant: "headingMd", children: "Get started with products" }),
            /* @__PURE__ */ jsxs(Text, { as: "p", variant: "bodyMd", children: [
              "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
              " ",
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                  target: "_blank",
                  removeUnderline: true,
                  children: "productCreate"
                }
              ),
              " ",
              "mutation in our API references."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(InlineStack, { gap: "300", children: [
            /* @__PURE__ */ jsx(Button, { loading: isLoading, onClick: generateProduct, children: "Generate a product" }),
            ((_c = fetcher.data) == null ? void 0 : _c.product) && /* @__PURE__ */ jsx(
              Button,
              {
                url: `shopify:admin/products/${productId}`,
                target: "_blank",
                variant: "plain",
                children: "View product"
              }
            )
          ] }),
          ((_d = fetcher.data) == null ? void 0 : _d.product) && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Text, { as: "h3", variant: "headingMd", children: [
              " ",
              "productCreate mutation"
            ] }),
            /* @__PURE__ */ jsx(
              Box,
              {
                padding: "400",
                background: "bg-surface-active",
                borderWidth: "025",
                borderRadius: "200",
                borderColor: "border",
                overflowX: "scroll",
                children: /* @__PURE__ */ jsx("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx("code", { children: JSON.stringify(fetcher.data.product, null, 2) }) })
              }
            ),
            /* @__PURE__ */ jsxs(Text, { as: "h3", variant: "headingMd", children: [
              " ",
              "productVariantUpdate mutation"
            ] }),
            /* @__PURE__ */ jsx(
              Box,
              {
                padding: "400",
                background: "bg-surface-active",
                borderWidth: "025",
                borderRadius: "200",
                borderColor: "border",
                overflowX: "scroll",
                children: /* @__PURE__ */ jsx("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx("code", { children: JSON.stringify(fetcher.data.variant, null, 2) }) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { content: "View Demo Section", children: /* @__PURE__ */ jsx("a", { href: "https://findsection.com", target: "blank", children: /* @__PURE__ */ jsx(Button, { accessibilityLabel: "View Demo Section" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxs(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "App template specs" }),
          /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
            /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", children: "Framework" }),
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://remix.run",
                  target: "_blank",
                  removeUnderline: true,
                  children: "Remix"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", children: "Database" }),
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://www.prisma.io/",
                  target: "_blank",
                  removeUnderline: true,
                  children: "Prisma"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", children: "Interface" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx(
                  Link$1,
                  {
                    url: "https://polaris.shopify.com",
                    target: "_blank",
                    removeUnderline: true,
                    children: "Polaris"
                  }
                ),
                ", ",
                /* @__PURE__ */ jsx(
                  Link$1,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    removeUnderline: true,
                    children: "App Bridge"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", children: "API" }),
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: true,
                  children: "GraphQL API"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Next steps" }),
          /* @__PURE__ */ jsxs(List, { children: [
            /* @__PURE__ */ jsxs(List.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ jsxs(
                Link$1,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  removeUnderline: true,
                  children: [
                    " ",
                    "example app"
                  ]
                }
              ),
              " ",
              "to get started"
            ] }),
            /* @__PURE__ */ jsxs(List.Item, { children: [
              "Explore Shopify’s API with",
              " ",
              /* @__PURE__ */ jsx(
                Link$1,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  removeUnderline: true,
                  children: "GraphiQL"
                }
              )
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Index$1,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const Polaris = {
  ActionMenu: {
    Actions: {
      moreActions: "More actions"
    },
    RollupActions: {
      rollupButton: "View actions"
    }
  },
  ActionList: {
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search",
      placeholder: "Search actions"
    }
  },
  Avatar: {
    label: "Avatar",
    labelWithInitials: "Avatar with initials {initials}"
  },
  Autocomplete: {
    spinnerAccessibilityLabel: "Loading",
    ellipsis: "{content}…"
  },
  Badge: {
    PROGRESS_LABELS: {
      incomplete: "Incomplete",
      partiallyComplete: "Partially complete",
      complete: "Complete"
    },
    TONE_LABELS: {
      info: "Info",
      success: "Success",
      warning: "Warning",
      critical: "Critical",
      attention: "Attention",
      "new": "New",
      readOnly: "Read-only",
      enabled: "Enabled"
    },
    progressAndTone: "{toneLabel} {progressLabel}"
  },
  Banner: {
    dismissButton: "Dismiss notification"
  },
  Button: {
    spinnerAccessibilityLabel: "Loading"
  },
  Common: {
    checkbox: "checkbox",
    undo: "Undo",
    cancel: "Cancel",
    clear: "Clear",
    close: "Close",
    submit: "Submit",
    more: "More"
  },
  ContextualSaveBar: {
    save: "Save",
    discard: "Discard"
  },
  DataTable: {
    sortAccessibilityLabel: "sort {direction} by",
    navAccessibilityLabel: "Scroll table {direction} one column",
    totalsRowHeading: "Totals",
    totalRowHeading: "Total"
  },
  DatePicker: {
    previousMonth: "Show previous month, {previousMonthName} {showPreviousYear}",
    nextMonth: "Show next month, {nextMonth} {nextYear}",
    today: "Today ",
    start: "Start of range",
    end: "End of range",
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    daysAbbreviated: {
      monday: "Mo",
      tuesday: "Tu",
      wednesday: "We",
      thursday: "Th",
      friday: "Fr",
      saturday: "Sa",
      sunday: "Su"
    }
  },
  DiscardConfirmationModal: {
    title: "Discard all unsaved changes",
    message: "If you discard changes, you’ll delete any edits you made since you last saved.",
    primaryAction: "Discard changes",
    secondaryAction: "Continue editing"
  },
  DropZone: {
    single: {
      overlayTextFile: "Drop file to upload",
      overlayTextImage: "Drop image to upload",
      overlayTextVideo: "Drop video to upload",
      actionTitleFile: "Add file",
      actionTitleImage: "Add image",
      actionTitleVideo: "Add video",
      actionHintFile: "or drop file to upload",
      actionHintImage: "or drop image to upload",
      actionHintVideo: "or drop video to upload",
      labelFile: "Upload file",
      labelImage: "Upload image",
      labelVideo: "Upload video"
    },
    allowMultiple: {
      overlayTextFile: "Drop files to upload",
      overlayTextImage: "Drop images to upload",
      overlayTextVideo: "Drop videos to upload",
      actionTitleFile: "Add files",
      actionTitleImage: "Add images",
      actionTitleVideo: "Add videos",
      actionHintFile: "or drop files to upload",
      actionHintImage: "or drop images to upload",
      actionHintVideo: "or drop videos to upload",
      labelFile: "Upload files",
      labelImage: "Upload images",
      labelVideo: "Upload videos"
    },
    errorOverlayTextFile: "File type is not valid",
    errorOverlayTextImage: "Image type is not valid",
    errorOverlayTextVideo: "Video type is not valid"
  },
  EmptySearchResult: {
    altText: "Empty search results"
  },
  Frame: {
    skipToContent: "Skip to content",
    navigationLabel: "Navigation",
    Navigation: {
      closeMobileNavigationLabel: "Close navigation"
    }
  },
  FullscreenBar: {
    back: "Back",
    accessibilityLabel: "Exit fullscreen mode"
  },
  Filters: {
    moreFilters: "More filters",
    moreFiltersWithCount: "More filters ({count})",
    filter: "Filter {resourceName}",
    noFiltersApplied: "No filters applied",
    cancel: "Cancel",
    done: "Done",
    clearAllFilters: "Clear all filters",
    clear: "Clear",
    clearLabel: "Clear {filterName}",
    addFilter: "Add filter",
    clearFilters: "Clear all",
    searchInView: "in:{viewName}"
  },
  FilterPill: {
    clear: "Clear",
    unsavedChanges: "Unsaved changes - {label}"
  },
  IndexFilters: {
    searchFilterTooltip: "Search and filter",
    searchFilterTooltipWithShortcut: "Search and filter (F)",
    searchFilterAccessibilityLabel: "Search and filter results",
    sort: "Sort your results",
    addView: "Add a new view",
    newView: "Custom search",
    SortButton: {
      ariaLabel: "Sort the results",
      tooltip: "Sort",
      title: "Sort by",
      sorting: {
        asc: "Ascending",
        desc: "Descending",
        az: "A-Z",
        za: "Z-A"
      }
    },
    EditColumnsButton: {
      tooltip: "Edit columns",
      accessibilityLabel: "Customize table column order and visibility"
    },
    UpdateButtons: {
      cancel: "Cancel",
      update: "Update",
      save: "Save",
      saveAs: "Save as",
      modal: {
        title: "Save view as",
        label: "Name",
        sameName: "A view with this name already exists. Please choose a different name.",
        save: "Save",
        cancel: "Cancel"
      }
    }
  },
  IndexProvider: {
    defaultItemSingular: "Item",
    defaultItemPlural: "Items",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} are selected",
    selected: "{selectedItemsCount} selected",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}"
  },
  IndexTable: {
    emptySearchTitle: "No {resourceNamePlural} found",
    emptySearchDescription: "Try changing the filters or search term",
    onboardingBadgeText: "New",
    resourceLoadingAccessibilityLabel: "Loading {resourceNamePlural}…",
    selectAllLabel: "Select all {resourceNamePlural}",
    selected: "{selectedItemsCount} selected",
    undo: "Undo",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural}",
    selectItem: "Select {resourceName}",
    selectButtonText: "Select",
    sortAccessibilityLabel: "sort {direction} by"
  },
  Loading: {
    label: "Page loading bar"
  },
  Modal: {
    iFrameTitle: "body markup",
    modalWarning: "These required properties are missing from Modal: {missingProps}"
  },
  Page: {
    Header: {
      rollupActionsLabel: "View actions for {title}",
      pageReadyAccessibilityLabel: "{title}. This page is ready"
    }
  },
  Pagination: {
    previous: "Previous",
    next: "Next",
    pagination: "Pagination"
  },
  ProgressBar: {
    negativeWarningMessage: "Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.",
    exceedWarningMessage: "Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."
  },
  ResourceList: {
    sortingLabel: "Sort by",
    defaultItemSingular: "item",
    defaultItemPlural: "items",
    showing: "Showing {itemsCount} {resource}",
    showingTotalCount: "Showing {itemsCount} of {totalItemsCount} {resource}",
    loading: "Loading {resource}",
    selected: "{selectedItemsCount} selected",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} in your store are selected",
    allFilteredItemsSelected: "All {itemsLength}+ {resourceNamePlural} in this filter are selected",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural} in your store",
    selectAllFilteredItems: "Select all {itemsLength}+ {resourceNamePlural} in this filter",
    emptySearchResultTitle: "No {resourceNamePlural} found",
    emptySearchResultDescription: "Try changing the filters or search term",
    selectButtonText: "Select",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}",
    Item: {
      actionsDropdownLabel: "Actions for {accessibilityLabel}",
      actionsDropdown: "Actions dropdown",
      viewItem: "View details for {itemName}"
    },
    BulkActions: {
      actionsActivatorLabel: "Actions",
      moreActionsActivatorLabel: "More actions"
    }
  },
  SkeletonPage: {
    loadingLabel: "Page loading"
  },
  Tabs: {
    newViewAccessibilityLabel: "Create new view",
    newViewTooltip: "Create view",
    toggleTabsLabel: "More views",
    Tab: {
      rename: "Rename view",
      duplicate: "Duplicate view",
      edit: "Edit view",
      editColumns: "Edit columns",
      "delete": "Delete view",
      copy: "Copy of {name}",
      deleteModal: {
        title: "Delete view?",
        description: "This can’t be undone. {viewName} view will no longer be available in your admin.",
        cancel: "Cancel",
        "delete": "Delete view"
      }
    },
    RenameModal: {
      title: "Rename view",
      label: "Name",
      cancel: "Cancel",
      create: "Save",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    DuplicateModal: {
      title: "Duplicate view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    CreateViewModal: {
      title: "Create new view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    }
  },
  Tag: {
    ariaLabel: "Remove {children}"
  },
  TextField: {
    characterCount: "{count} characters",
    characterCountWithMaxLength: "{count} of {limit} characters used"
  },
  TooltipOverlay: {
    accessibilityLabel: "Tooltip: {label}"
  },
  TopBar: {
    toggleMenuLabel: "Toggle menu",
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search"
    }
  },
  MediaCard: {
    dismissButton: "Dismiss",
    popoverButton: "Actions"
  },
  VideoThumbnail: {
    playButtonA11yLabel: {
      "default": "Play video",
      defaultWithDuration: "Play video of length {duration}",
      duration: {
        hours: {
          other: {
            only: "{hourCount} hours",
            andMinutes: "{hourCount} hours and {minuteCount} minutes",
            andMinute: "{hourCount} hours and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hours, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hours, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hours, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hours and {secondCount} seconds",
            andSecond: "{hourCount} hours and {secondCount} second"
          },
          one: {
            only: "{hourCount} hour",
            andMinutes: "{hourCount} hour and {minuteCount} minutes",
            andMinute: "{hourCount} hour and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hour, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hour, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hour, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hour and {secondCount} seconds",
            andSecond: "{hourCount} hour and {secondCount} second"
          }
        },
        minutes: {
          other: {
            only: "{minuteCount} minutes",
            andSeconds: "{minuteCount} minutes and {secondCount} seconds",
            andSecond: "{minuteCount} minutes and {secondCount} second"
          },
          one: {
            only: "{minuteCount} minute",
            andSeconds: "{minuteCount} minute and {secondCount} seconds",
            andSecond: "{minuteCount} minute and {secondCount} second"
          }
        },
        seconds: {
          other: "{secondCount} seconds",
          one: "{secondCount} second"
        }
      }
    }
  }
};
const polarisTranslations = {
  Polaris
};
function loginErrorMessage(loginErrors) {
  if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.MissingShop) {
    return { shop: "Please enter your shop domain to log in" };
  } else if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.InvalidShop) {
    return { shop: "Please enter a valid shop domain to log in" };
  }
  return {};
}
const links = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$2 = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return json({ errors, polarisTranslations });
};
const action$1 = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return json({
    errors
  });
};
function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;
  return /* @__PURE__ */ jsx(AppProvider$1, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ jsx(Page, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsxs(FormLayout, { children: [
    /* @__PURE__ */ jsx(Text, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ jsx(
      TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ jsx(Button, { submit: true, children: "Log in" })
  ] }) }) }) }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Auth,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);
  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);
  const fullscreenBarMarkup = /* @__PURE__ */ jsx(FullscreenBar, { onAction: handleActionClick, children: /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem"
      },
      children: [
        /* @__PURE__ */ jsx(Badge, { tone: "info", children: "Draft" }),
        /* @__PURE__ */ jsx("div", { style: { marginLeft: "1rem", flexGrow: 1 }, children: /* @__PURE__ */ jsx(Text, { variant: "headingLg", as: "p", children: "Page title" }) }),
        /* @__PURE__ */ jsxs(ButtonGroup, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => {
          }, children: "Secondary Action" }),
          /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: () => {
          }, children: "Primary Action" })
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ jsxs("div", { style: { height: "250px", width: "100%" }, children: [
    isFullscreen && fullscreenBarMarkup,
    /* @__PURE__ */ jsxs("div", { style: { padding: "1rem" }, children: [
      !isFullscreen && /* @__PURE__ */ jsx(Button, { onClick: () => setFullscreen(true), children: "Go Fullscreen" }),
      /* @__PURE__ */ jsx(Text, { variant: "headingLg", as: "p", children: "Page content" })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FullscreenBarExample
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);
  if (!admin) {
    throw new Response();
  }
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await prisma.session.deleteMany({ where: { shop } });
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return json(true);
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Response("Database connection failed", { status: 500 });
  }
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "font-sans p-4", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: "Welcome to Remix" }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BRZylfCM.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-DfRgSgMa.js", "/assets/components-_u7h16TB.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B4tIkpjL.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-DfRgSgMa.js", "/assets/components-_u7h16TB.js"], "css": [] }, "routes/app.additional": { "id": "routes/app.additional", "parentId": "routes/app", "path": "additional", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.additional-BdM09kMX.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-DfRgSgMa.js", "/assets/use-is-after-initial-mount-cGY6M9HE.js", "/assets/ButtonGroup-GAgwehkr.js", "/assets/context-B5Hw9-iY.js", "/assets/Page-Dq-yv9Nd.js", "/assets/index-wOTgYqm1.js", "/assets/List-CxjFs5Qr.js"], "css": [] }, "routes/app._index": { "id": "routes/app._index", "parentId": "routes/app", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app._index-BiVEjAvO.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-DfRgSgMa.js", "/assets/use-is-after-initial-mount-cGY6M9HE.js", "/assets/ButtonGroup-GAgwehkr.js", "/assets/context-B5Hw9-iY.js", "/assets/Page-Dq-yv9Nd.js", "/assets/index-wOTgYqm1.js", "/assets/components-_u7h16TB.js", "/assets/List-CxjFs5Qr.js"], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DSs-CAQa.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/use-is-after-initial-mount-cGY6M9HE.js", "/assets/context-B5Hw9-iY.js", "/assets/index-DfRgSgMa.js", "/assets/ButtonGroup-GAgwehkr.js", "/assets/styles-DxFxlBbb.js", "/assets/components-_u7h16TB.js", "/assets/Page-Dq-yv9Nd.js"], "css": [] }, "routes/app.test": { "id": "routes/app.test", "parentId": "routes/app", "path": "test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.test-BWLvIXm0.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/use-is-after-initial-mount-cGY6M9HE.js", "/assets/ButtonGroup-GAgwehkr.js"], "css": [] }, "routes/webhooks": { "id": "routes/webhooks", "parentId": "root", "path": "webhooks", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-VvYAG8M6.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js"], "css": [] }, "routes/app": { "id": "routes/app", "parentId": "root", "path": "app", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/app-B11YQUSr.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-DfRgSgMa.js", "/assets/use-is-after-initial-mount-cGY6M9HE.js", "/assets/context-B5Hw9-iY.js", "/assets/components-_u7h16TB.js", "/assets/styles-DxFxlBbb.js", "/assets/index-wOTgYqm1.js"], "css": [] } }, "url": "/assets/manifest-1271ea2d.js", "version": "1271ea2d" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/app.test": {
    id: "routes/app.test",
    parentId: "routes/app",
    path: "test",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
