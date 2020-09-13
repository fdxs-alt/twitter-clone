import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './../Shared/AuthGuard';
import {
    Controller,
    UseGuards,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFiles,
    Delete,
    Param,
} from '@nestjs/common';
import { TweetService } from './Tweet.service';
import { User } from '../User/User.decorator';
import { TweetInput } from './Tweet.dto';

@Controller('tweets')
export class TweetControler {
    constructor(private tweetService: TweetService) {}

    @Get('')
    @UseGuards(AuthGuard)
    getAllUserTweets(@User('id') id: string) {
        return this.tweetService.getAllUserTweets(id);
    }

    @Post('/postTweet')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'tweetImages', maxCount: 5 }]),
    )
    postTweet(
        @User('id') id: string,
        @Body() data: TweetInput,
        @UploadedFiles() files?: any,
    ) {
        return this.tweetService.postTweet(data, id, files?.tweetImages);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteTweet(@Param('id') id: string) {
        return this.tweetService.deleteTweet(id);
    }

    @Post('/retweet/:tweetId')
    @UseGuards(AuthGuard)
    retweet(@Param('tweetId') tweetId: string, @User('id') id: string) {
        return this.tweetService.retweet(id, tweetId);
    }

    @Delete('/undoRetweet/:tweetId')
    @UseGuards(AuthGuard)
    undoRetweet(@Param('tweetId') tweetId: string, @User('id') id: string) {
        return this.tweetService.undoRetweet(id, tweetId);
    }

    @Post('/comment/:tweetId')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'tweetImages', maxCount: 5 }]),
    )
    comment(
        @User('id') id: string,
        @Body() data: TweetInput,
        @Param('tweetId') tweetId: string,
        @UploadedFiles() files?: any,
    ) {
        return this.tweetService.comment(tweetId, data, id, files?.tweetImages);
    }

    @Get('/comments/:postId')
    @UseGuards(AuthGuard)
    getComments(@Param('postId') postId: string) {
        return this.tweetService.getAllComments(postId);
    }

    @Delete('/comment/:postId/:id')
    @UseGuards(AuthGuard)
    deleteComment(@Param('postId') postId: string, @Param('id') id: string) {
        return this.tweetService.deleteComment(postId, id);
    }
}
