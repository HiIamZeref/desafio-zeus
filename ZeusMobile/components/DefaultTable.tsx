import { ScrollView, Text } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";

interface DefaultTableProps {
  data: Object[];
}

export default function DefaultTable(DefaultTableProps: DefaultTableProps) {
  const { data } = DefaultTableProps;
  const dataKeys = Object.keys(data[0]);

  return (
    <DataTable>
      <DataTable.Header>
        {/* <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Favourite Food</DataTable.Title>
        <DataTable.Title>Age</DataTable.Title> */}
        {dataKeys.map((key) => (
          <DataTable.Title>{key}</DataTable.Title>
        ))}
      </DataTable.Header>
      <ScrollView>
        <DataTable.Row>
          <DataTable.Cell>Radhika</DataTable.Cell>
          <DataTable.Cell>Dosa</DataTable.Cell>
          <DataTable.Cell>23</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Krishna</DataTable.Cell>
          <DataTable.Cell>Uttapam</DataTable.Cell>
          <DataTable.Cell>26</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Vanshika</DataTable.Cell>
          <DataTable.Cell>Brownie</DataTable.Cell>
          <DataTable.Cell>20</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Teena</DataTable.Cell>
          <DataTable.Cell>Pizza</DataTable.Cell>
          <DataTable.Cell>24</DataTable.Cell>
        </DataTable.Row>
      </ScrollView>
    </DataTable>
  );
}
