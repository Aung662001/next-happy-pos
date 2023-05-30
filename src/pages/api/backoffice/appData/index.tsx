import { prisma } from "../../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = session?.user;
  const email = user?.email as string;
  const name = user?.name as string;
  const allTables = [
    "users",
    "companies",
    "locations",
    "menus_locations",
    "addon_categories",
    "addons",
    "menu_categories",
    "menus",
    "menus_addon_categories",
    "menus_menu_categories",
  ];
  // await prisma.locations.deleteMany();
  // await prisma.companies.deleteMany();

  // return res.send(200);
  const isDuplicate = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  if (!isDuplicate) {
    //creationg new companies
    const newCompany = await prisma.companies.create({
      data: {
        name: "Default Company",
      },
    });
    //creating new locations
    const newLocation = await prisma.locations.create({
      data: {
        name: "Default Location",
        address: "Default Address",
        companies_id: newCompany.id,
      },
    });
    //create new users
    const newUser = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: "",
        companies_id: newCompany.id,
      },
    });
    //create new menus
    const menuDatas = [
      { name: "nan-gyi-tote", price: 1000 },
      { name: "rice", price: 1000 },
    ];
    const newMenus = await prisma.$transaction(
      menuDatas.map((menu) =>
        prisma.menus.create({
          data: menu,
        })
      )
    );

    //create new menu_categories
    const menuCategoriesData = [{ name: "BreakFast" }, { name: "Lunch" }];
    const newMenuCategories = await prisma.$transaction(
      menuCategoriesData.map((menuCat) =>
        prisma.menu_categories.create({ data: menuCat })
      )
    );

    //create new addon_categories
    const addOnCtegoriesData = [{ name: "Drink" }, { name: "Size" }];
    const newAddonCategories = await prisma.$transaction(
      addOnCtegoriesData.map((addOnCate) =>
        prisma.addon_categories.create({
          data: addOnCate,
        })
      )
    );

    //create new addons
    const TRUE = true;
    const addOnDatas = [
      {
        name: "Cola",
        price: 500,
        is_avaiable: TRUE,
        addon_categories_id: newAddonCategories[0].id,
      },
      {
        name: "PocariSweat",
        price: 1000,
        is_avaiable: TRUE,
        addon_categories_id: newAddonCategories[0].id,
      },
      {
        name: "Normal",
        price: 0,
        is_avaiable: TRUE,
        addon_categories_id: newAddonCategories[1].id,
      },
      {
        name: "Large",
        price: 300,
        is_avaiable: TRUE,
        addon_categories_id: newAddonCategories[1].id,
      },
    ];
    const newAddons = await prisma.$transaction(
      addOnDatas.map((addon) =>
        prisma.addons.create({
          data: addon,
        })
      )
    );

    //create menus_menu_categories
    const menu_menuCategoriesDatas = [
      {
        menus_id: newMenus[0].id,
        locations_id: newLocation.id,
        menu_categories_id: newMenuCategories[0].id,
      },
      {
        menus_id: newMenus[1].id,
        locations_id: newLocation.id,
        menu_categories_id: newMenuCategories[1].id,
      },
    ];
    const newMenusMenusCategoriesLocations = await prisma.$transaction(
      menu_menuCategoriesDatas.map((menuMC) =>
        prisma.menus_menu_categories_locations.create({
          data: menuMC,
        })
      )
    );
    //create new menus_addon_categories
    const menus_addon_categoriesDatas = [
      {
        menus_id: newMenus[0].id,
        addon_categories_id: newAddonCategories[1].id,
      },
      {
        menus_id: newMenus[1].id,
        addon_categories_id: newAddonCategories[0].id,
      },
    ];
    const newMenus_addon_categories = await prisma.$transaction(
      menus_addon_categoriesDatas.map((menuAC) =>
        prisma.menus_addon_categories.create({
          data: menuAC,
        })
      )
    );
    await prisma.$disconnect();

    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      menusMenuCategoriesLocation: newMenusMenusCategoriesLocations,
      company: newCompany,
    });
  } else {
    //user
    const user = await prisma.users.findFirst({
      where: { email: email },
    });
    const company_id = user?.companies_id as number;
    //location
    const Locations = await prisma.locations.findMany({
      where: {
        companies_id: company_id,
      },
    });
    const locationIds = Locations.map((location) => location.id as number);
    //menusMenuCategoriesLocation
    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          locations_id: {
            in: locationIds,
          },
        },
      });
    const menuCategoriesIds = menusMenuCategoriesLocations.map(
      (MCL) => MCL.menu_categories_id
    );
    const menuIds = menusMenuCategoriesLocations
      .map((MCL) => MCL.menus_id)
      .filter((mcl) => mcl !== null) as number[];
    //menus

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
      },
    });
    const menuAddonCategoriesIds = await prisma.menus_addon_categories.findMany(
      {
        where: {
          menus_id: {
            in: menuIds,
          },
        },
      }
    );
    const addonCategoriesIds = menuAddonCategoriesIds.map(
      (ma) => ma.addon_categories_id
    ) as number[];
    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCategoriesIds,
        },
      },
    }); //
    const addons = await prisma.addons.findMany({
      where: {
        addon_categories_id: {
          in: addonCategoriesIds,
        },
      },
    });

    const menuCategories = await prisma.menu_categories.findMany();
    const companies = await prisma.companies.findMany({
      where: {
        id: company_id,
      },
    });
    await prisma.$disconnect();
    res.send({
      menus,
      Locations,
      addons,
      addonCategories,
      menuCategories,
      menusMenuCategoriesLocations,
      companies,
    });
  }
}
