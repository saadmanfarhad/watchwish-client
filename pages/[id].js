import React, { useState } from "react";
import Head from "next/head";
import { Layout } from "../components/layout.tsx";
import axios from "axios";

const DetailsPage = ({ details }) => {
  console.log(details);
  return (
    <div>
      Hello There !
    </div>
  )
}

export async function getServerSideProps(ctx) {
  console.log(ctx.params);
  const id = ctx.params.id;
  // const details = axios.get()

  return {
    props: {
      details: {
        name: ctx.query
      }
    }
  }
}

export default DetailsPage;
