import organizationFieldsConfig from "../../fields/config/org/organizationFieldsConfig";
import { Button, Card, Field, Operation, PerfTab, Row } from "./types";
import { BENCHER_API_URL, parentPath, addPath, viewSlugPath } from "./util";

const organizationsConfig = {
  [Operation.LIST]: {
    operation: Operation.LIST,
    redirect: (table_data) => {
      return table_data?.length === 1 ?
        `/console/organizations/${table_data[0]?.slug}/projects`
        : null;
    },
    header: {
      title: "Organizations",
      buttons: [
        { kind: Button.REFRESH },
      ],
    },
    table: {
      url: (_path_params) => {
        return `${BENCHER_API_URL}/v0/organizations`;
      },
      row: {
        key: "name",
        items: [
          {
            kind: Row.TEXT,
            key: "slug",
          },
          {},
          {},
          {},
        ],
        button: {
          text: "Select",
          path: (pathname, datum) => {
            return viewSlugPath(pathname, datum) + "/projects";
          },
        },
      },
    },
  },
  [Operation.VIEW]: {
    operation: Operation.VIEW,
    header: {
      key: "name",
      path: (pathname) => {
        return parentPath(pathname);
      },
    },
    deck: {
      url: (path_params) => {
        return `${BENCHER_API_URL}/v0/organizations/${path_params?.organization_slug}`;
      },
      cards: [
        {
          kind: Card.FIELD,
          field: "Organization Name",
          key: "name",
        },
        {
          kind: Card.FIELD,
          field: "Organization Slug",
          key: "slug",
        },
      ],
      buttons: {
        path: (path_params) => {
          return `/console/organizations/${path_params?.organization_slug}/projects`
        },
      },
    },
  },
};

export default organizationsConfig;
