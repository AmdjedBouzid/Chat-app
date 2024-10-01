import { NextResponse } from "next/server";
import { connectDB } from "../../mongodb/index";
import User from "../../models/User";
import Chat from "../../models/Chat";

/**
 * @method POST
 * @route http://localhost:3000/api/chats
 * @description create new chat
 * @access public
 */
export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const { curentuser_ID, members, IS_Groupe, name, Groupe_Photo } = body;

    const query = IS_Groupe
      ? { IS_Groupe, name, Groupe_Photo, members: [curentuser_ID, ...members] }
      : { members: [curentuser_ID, ...members] };

    let chat = await Chat.findOne(query);
    if (chat)
      return NextResponse.json(
        { message: "chat is existing", chat },
        { status: 200 }
      );
    if (!chat) {
      chat = new Chat(query);
      await chat.save();
    }

    await Promise.all(
      [curentuser_ID, ...members].map(async (memberId) => {
        await User.findByIdAndUpdate(memberId, {
          $addToSet: { chats: chat._id },
        });
      })
    );

    return NextResponse.json(
      { message: "Success to create a new chat", chat },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
