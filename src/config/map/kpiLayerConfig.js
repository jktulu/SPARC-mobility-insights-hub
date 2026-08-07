export const layerConfig = {
  A02: {
    id: "data-layer",
    type: "fill",
    file: "kpiData",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "pct_accessible"],
        25,
        "#deebf7",
        50,
        "#6baed6",
        75,
        "#08519c",
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "#333333",
    },
    tooltipProperties: [
      { label: "Ward: ", property: "ward_id" },
      { label: "Assembly: ", property: "assembly" },
      { label: "Population: ", property: "pop"},
      {
        label: "Pop% within 500m of transit: ",
        property: "pct_accessible",
        suffix: "%",
      },
    ],
  },
    A04: {
    id: "data-layer",
    type: "line",
    file: "kpiData",
    paint: {
      "line-color": "#08519c",
      "line-opacity": 0.8,
    },
    tooltipProperties: [
      { label: "Road: ", property: "name_1" },
    ],
  },
  B02: {
    id: "data-layer",
    type: "line",
    file: "kpiData",
    paint: {
      "line-color": [
        "interpolate",
        ["linear"],
        ["get", "private"],
        0,
        "#2922f7",
        25,
        "#9895fe",
        50,
        "#c95757",
        75,
        "#9c0808",
      ],
      "line-width": 2,
      "line-opacity": 0.5,
        },
    tooltipProperties: [
      { label: "Road name: ", property: "Roadname"},
      { label: "Two Wheelers: ", property: "two_wheele", suffix: "%" },
      { label: "Three Wheelers: ", property: "IPT", suffix: "%"},
      { label: "Four Wheelers: ", property: "car_jeep_v", suffix: "%"},
      { label: "Buses: ", property: "bus", suffix: "%"},
      { label: "Goods vehicles: ", property: "Goods_vehi", suffix: "%"},
      { label: "Others: ", property: "others2", suffix: "%"},
    ],
  },
  A10: {
    id: "data-layer",
    type: "circle",
    file: "kpiData",
    paint: {
      "circle-color": [
        'match',
        ['get', 'STATUS'],
        'Multi-Storey',
        "#92089c",
        'Off-Street',
        "#08519c",
        'On-Street',
        "#9c6b08",
        /* other */ '#ccc'
      ],
      "circle-opacity": 0.8,
      "circle-stroke-color": "#ffffff",
    },
    tooltipProperties: [
      { label: "Location: ", property: "LOCATION" },
      { label: "Status: ", property: "STATUS" },
    ],
  },
    A11: {
    id: "data-layer",
    type: "circle",
    file: "kpiData",
    paint: {
      "circle-color": [
        'match',
        ['get', 'Lighting'],
        0,
        '#000000',
        1,
        "#0040ff",
        2,
        "#00e5ff",
        3,
        "#66ff00",
        /* other */ '#000000'
      ],
      "circle-opacity": 0.8,
      "circle-stroke-color": "#ffffff",
    },
    // tooltipProperties: [
    //   { label: "Audit point: ", property: "audit_point" },
    //   { label: "Lighting score: ", property: "Lighting" },
    //   { label: "Lighting description: ", property: "light_descr" },
    //   { label: "Image 1: ", property: "image_1" },
    //   { label: "Image 2: ", property: "image_2" }
    // ],
    tooltipProperties: [
  { label: "Audit point: ", property: "audit_point" },
  { label: "Lighting score: ", property: "Lighting" },
  { label: "Lighting description: ", property: "light_descr" },
  { 
    label: "Image 1: ", 
    property: "image_1",
    render: (value) => `<a href="${value}" target="_blank">View Image</a>`
  },
  { 
    label: "Image 2: ", 
    property: "image_2",
    render: (value) => `<a href="${value}" target="_blank">View Image</a>`
  }
]
  },
};
