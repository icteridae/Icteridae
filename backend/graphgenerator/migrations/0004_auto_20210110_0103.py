# Generated by Django 3.1.1 on 2021-01-10 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphgenerator', '0003_auto_20210109_1715'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='inCitations',
            field=models.ManyToManyField(related_name='outCitations', to='graphgenerator.Paper'),
        ),
    ]
